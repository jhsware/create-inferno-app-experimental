/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import JsonInclusion from './JsonInclusion';

describe('JSON inclusion', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    InfernoDOM.render(<JsonInclusion />, div);
  });
});
