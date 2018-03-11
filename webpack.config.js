const path = require('path');

const homeConfigs = {
  mode: "development",
  entry: './src/home.js',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: "babel-loader"
    }]
  },
  output: {
    filename: 'home.js',
    path: path.resolve(__dirname, 'public')
  }
};


const userConfigs = {
  mode: "development",
  entry: './src/user/user.js',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: "babel-loader"
    }]
  },
  output: {
    filename: 'user.js',
    path: path.resolve(__dirname, 'views/users/js')
  }
};

module.exports = [homeConfigs, userConfigs];