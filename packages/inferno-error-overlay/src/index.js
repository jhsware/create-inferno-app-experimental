/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  listenToRuntimeErrors,
  crashWithFrames,
} from './listenToRuntimeErrors';
import { iframeStyle } from './styles';
import { applyStyles } from './utils/dom/css';

// Importing iframe-bundle generated in the pre build step as
// a text using webpack raw-loader. See webpack.config.js file.
// $FlowFixMe
import iframeScript from 'iframeScript';

let iframe = null;
let isLoadingIframe = false;
var isIframeReady = false;

let editorHandler = null;
let currentBuildError = null;
let currentRuntimeErrorRecords = [];
let currentRuntimeErrorOptions = null;
let stopListeningToRuntimeErrors = null;

export function setEditorHandler(handler) {
  editorHandler = handler;
  if (iframe) {
    update();
  }
}

export function reportBuildError(error) {
  currentBuildError = error;
  update();
}

export function reportRuntimeError(
  error,
  options = {}
) {
  currentRuntimeErrorOptions = options;
  crashWithFrames(handleRuntimeError(options))(error);
}

export function dismissBuildError() {
  currentBuildError = null;
  update();
}

export function startReportingRuntimeErrors(options) {
  if (stopListeningToRuntimeErrors !== null) {
    throw new Error('Already listening');
  }
  if (options.launchEditorEndpoint) {
    console.warn(
      'Warning: `startReportingRuntimeErrors` doesn’t accept ' +
        '`launchEditorEndpoint` argument anymore. Use `listenToOpenInEditor` ' +
        'instead with your own implementation to open errors in editor '
    );
  }
  currentRuntimeErrorOptions = options;
  stopListeningToRuntimeErrors = listenToRuntimeErrors(
    handleRuntimeError(options),
    options.filename
  );
}

const handleRuntimeError = (options) => (
  errorRecord
) => {
  try {
    if (typeof options.onError === 'function') {
      options.onError.call(null);
    }
  } finally {
    if (
      currentRuntimeErrorRecords.some(
        ({ error }) => error === errorRecord.error
      )
    ) {
      // Deduplicate identical errors.
      // This fixes https://github.com/facebook/create-react-app/issues/3011.
      return;
    }
    currentRuntimeErrorRecords = currentRuntimeErrorRecords.concat([
      errorRecord,
    ]);
    update();
  }
};

export function dismissRuntimeErrors() {
  currentRuntimeErrorRecords = [];
  update();
}

export function stopReportingRuntimeErrors() {
  if (stopListeningToRuntimeErrors === null) {
    throw new Error('Not currently listening');
  }
  currentRuntimeErrorOptions = null;
  try {
    stopListeningToRuntimeErrors();
  } finally {
    stopListeningToRuntimeErrors = null;
  }
}

function update() {
  // Loading iframe can be either sync or async depending on the browser.
  if (isLoadingIframe) {
    // Iframe is loading.
    // First render will happen soon--don't need to do anything.
    return;
  }
  if (isIframeReady) {
    // Iframe is ready.
    // Just update it.
    updateIframeContent();
    return;
  }
  // We need to schedule the first render.
  isLoadingIframe = true;
  const loadingIframe = window.document.createElement('iframe');
  applyStyles(loadingIframe, iframeStyle);
  loadingIframe.onload = function () {
    const iframeDocument = loadingIframe.contentDocument;
    if (iframeDocument != null && iframeDocument.body != null) {
      iframe = loadingIframe;
      const script = loadingIframe.contentWindow.document.createElement(
        'script'
      );
      script.type = 'text/javascript';
      script.innerHTML = iframeScript;
      iframeDocument.body.appendChild(script);
    }
  };
  const appDocument = window.document;
  appDocument.body.appendChild(loadingIframe);
}

function updateIframeContent() {
  if (!currentRuntimeErrorOptions) {
    throw new Error('Expected options to be injected.');
  }

  if (!iframe) {
    throw new Error('Iframe has not been created yet.');
  }

  const isRendered = iframe.contentWindow.updateContent({
    currentBuildError,
    currentRuntimeErrorRecords,
    dismissRuntimeErrors,
    editorHandler,
  });

  if (!isRendered) {
    window.document.body.removeChild(iframe);
    iframe = null;
    isIframeReady = false;
  }
}

window.__INFERNO_ERROR_OVERLAY_GLOBAL_HOOK__ =
  window.__INFERNO_ERROR_OVERLAY_GLOBAL_HOOK__ || {};
window.__INFERNO_ERROR_OVERLAY_GLOBAL_HOOK__.iframeReady = function iframeReady() {
  isIframeReady = true;
  isLoadingIframe = false;
  updateIframeContent();
};

if (process.env.NODE_ENV === 'production') {
  console.warn(
    'inferno-error-overlay is not meant for use in production. You should ' +
      'ensure it is not included in your build to reduce bundle size.'
  );
}
