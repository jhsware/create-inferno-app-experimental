/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'inferno-app-polyfill/ie9';
import { Component } from 'inferno';
import CompileErrorContainer from './containers/CompileErrorContainer';
import RuntimeErrorContainer from './containers/RuntimeErrorContainer';
import { overlayStyle } from './styles';
import { applyStyles, getTheme } from './utils/dom/css';

let iframeRoot = null;
const theme = getTheme();

class ThemeContext extends Component {
  getChildContext() {
    return theme;
  }
}

function render({
  currentBuildError,
  currentRuntimeErrorRecords,
  dismissRuntimeErrors,
  editorHandler,
}) {
  if (currentBuildError) {
    return (
      <ThemeContext>
        <CompileErrorContainer
          error={currentBuildError}
          editorHandler={editorHandler}
        />
      </ThemeContext>
    );
  }
  if (currentRuntimeErrorRecords.length > 0) {
    return (
      <ThemeContext>
        <RuntimeErrorContainer
          errorRecords={currentRuntimeErrorRecords}
          close={dismissRuntimeErrors}
          editorHandler={editorHandler}
        />
      </ThemeContext>
    );
  }
  return null;
}

window.updateContent = function updateContent(errorOverlayProps) {
  let renderedElement = render(errorOverlayProps);

  if (renderedElement === null) {
    InfernoDOM.unmountComponentAtNode(iframeRoot);
    return false;
  }
  // Update the overlay
  render(renderedElement, iframeRoot);
  return true;
};

document.body.style.margin = '0';
// Keep popup within body boundaries for iOS Safari
document.body.style['max-width'] = '100vw';
iframeRoot = document.createElement('div');
applyStyles(iframeRoot, overlayStyle(theme));
document.body.appendChild(iframeRoot);
window.parent.__INFERNO_ERROR_OVERLAY_GLOBAL_HOOK__.iframeReady();
