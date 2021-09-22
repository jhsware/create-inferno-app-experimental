const babelOptions = { presets: ['inferno-app'] };

module.exports = require('babel-jest').createTransformer(babelOptions);
