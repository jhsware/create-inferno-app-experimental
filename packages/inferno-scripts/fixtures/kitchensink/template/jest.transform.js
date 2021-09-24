const babelOptions = { presets: ['inferno-app'] };

const babelJest = require('babel-jest').default;

module.exports = babelJest.createTransformer(babelOptions);
