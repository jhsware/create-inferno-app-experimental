/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// Fix eslint shareable config (https://github.com/eslint/eslint/issues/3458)
require('@rushstack/eslint-patch/modern-module-resolution');

// This file contains the minimum ESLint configuration required for Create
// Inferno App support, and is used as the `baseConfig` for `eslint-loader`
// to ensure that user-provided configs don't need this boilerplate.

module.exports = {
  root: true,

  parser: '@babel/eslint-parser',

  plugins: ['inferno'],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['babel-preset-inferno-app/prod'],
    },
  },

  settings: {
    inferno: {
      version: 'detect',
    },
  },

  rules: {
    'inferno/jsx-uses-vars': 'warn',
    'inferno/jsx-uses-inferno': 'warn',
  },
};
