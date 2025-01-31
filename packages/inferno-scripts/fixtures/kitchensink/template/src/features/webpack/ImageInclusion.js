/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Inferno from 'inferno';
import tiniestCat from './assets/tiniest-cat.jpg';

const ImageInclusion = () => (
  <img id="feature-image-inclusion" src={tiniestCat} alt="tiniest cat" />
);

export default ImageInclusion;
