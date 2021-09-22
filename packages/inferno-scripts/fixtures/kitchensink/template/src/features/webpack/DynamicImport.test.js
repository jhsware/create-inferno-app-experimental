/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';

describe('dynamic import', () => {
  it('renders without crashing', async () => {
    const DynamicImport = (await import('./DynamicImport')).default;
    const div = document.createElement('div');
    InfernoDOM.render(<DynamicImport />, div);
    expect(div.textContent).toBe('Hello World!');
  });
});
