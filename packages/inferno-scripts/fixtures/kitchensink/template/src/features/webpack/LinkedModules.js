/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Inferno from 'inferno';
import './assets/style.css';
import { test, version } from 'test-integrity';

const LinkedModules = () => {
  const v = version();
  if (!test() || v !== '2.0.0') {
    throw new Error('Functionality test did not pass.');
  }
  return <p id="feature-linked-modules">{v}</p>;
};

export default LinkedModules;
