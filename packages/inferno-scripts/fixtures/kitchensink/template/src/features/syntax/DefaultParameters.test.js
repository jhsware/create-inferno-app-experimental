/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Inferno from 'inferno';
import { render } from 'inferno';
import DefaultParameters from './DefaultParameters';

describe('default parameters', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    return new Promise(resolve => {
      render(<DefaultParameters onReady={resolve} />, div);
    });
  });
});
