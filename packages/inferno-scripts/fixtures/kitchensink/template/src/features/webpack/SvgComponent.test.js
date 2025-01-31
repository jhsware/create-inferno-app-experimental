/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Inferno from 'inferno';
import { render } from 'inferno';
import SvgComponent, { SvgComponentWithRef } from './SvgComponent';

describe('svg component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<SvgComponent />, div);
    expect(div.textContent).toBe('logo.svg');
  });

  it('svg root element equals the passed ref', () => {
    const div = document.createElement('div');
    const someRef = Inferno.createRef();
    render(<SvgComponentWithRef ref={someRef} />, div);
    const svgElement = div.getElementsByTagName('svg');
    expect(svgElement).toHaveLength(1);
    expect(svgElement[0]).toBe(someRef.current);
  });
});
