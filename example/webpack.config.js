const path = require('path');

module.exports = {

  entry: '../example/assets/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
};