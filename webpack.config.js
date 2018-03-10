const path = require('path');

const config = {
    mode:"development",
  entry: './src/home.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'home.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' }
    ]
  }
};

module.exports = config;
