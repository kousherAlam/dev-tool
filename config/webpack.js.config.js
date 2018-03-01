const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/js/')+'app.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
