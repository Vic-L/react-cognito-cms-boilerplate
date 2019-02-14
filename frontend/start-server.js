console.log('require @babel/register');
require('@babel/register')({
  presets: [
    '@babel/preset-react',
    '@babel/preset-env'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node-babel-7',
    'babel-plugin-styled-components'
  ]
});

console.log('require server');
module.exports = require('./server');
