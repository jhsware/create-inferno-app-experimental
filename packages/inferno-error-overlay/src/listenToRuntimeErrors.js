/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  register as registerError,
  unregister as unregisterError,
} from './effects/unhandledError';
import {
  register as registerPromise,
  unregister as unregisterPromise,
} from './effects/unhandledRejection';
import {
  register as registerStackTraceLimit,
  unregister as unregisterStackTraceLimit,
} from './effects/stackTraceLimit';
import {
  permanentRegister as permanentRegisterConsole,
  registerInfernoStack,
  unregisterInfernoStack,
} from './effects/proxyConsole';
import { massage as massageWarning } from './utils/warnings';
import getStackFrames from './utils/getStackFrames';


const CONTEXT_SIZE = 3;


export const crashWithFrames = (crash) => (
  error,
  unhandledRejection = false
) => {
  getStackFrames(error, unhandledRejection, CONTEXT_SIZE)
    .then(stackFrames => {
      if (stackFrames == null) {
        return;
      }
      crash({
        error,
        unhandledRejection,
        contextSize: CONTEXT_SIZE,
        stackFrames,
      });
    })
    .catch(e => {
      console.log('Could not get the stack frames of error:', e);
    });
};

export function listenToRuntimeErrors(
  crash,
  filename = '/static/js/bundle.js'
) {
  const crashWithFramesRunTime = crashWithFrames(crash);

  registerError(window, error => crashWithFramesRunTime(error, false));
  registerPromise(window, error => crashWithFramesRunTime(error, true));
  registerStackTraceLimit();
  registerInfernoStack();
  permanentRegisterConsole('error', (warning, stack) => {
    const data = massageWarning(warning, stack);
    crashWithFramesRunTime(
      // $FlowFixMe
      {
        message: data.message,
        stack: data.stack,
        __unmap_source: filename,
      },
      false
    );
  });

  return function stopListening() {
    unregisterStackTraceLimit();
    unregisterPromise(window);
    unregisterError(window);
    unregisterInfernoStack();
  };
}
