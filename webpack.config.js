const path = require('path');

module.exports = {
  mode:"development",
  entry: './src/home.js',
  module: {
   rules: [{test:/\.(js|jsx)$/,use:"babel-loader"}]
  },
  output: {
    filename: 'home.js',
    path: path.resolve(__dirname, 'public')
  }
};