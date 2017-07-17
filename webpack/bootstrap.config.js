// Webpack config for development
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    'bootstrap': 'bootstrap-loader/extractStyles' /* bootstrap-loader takes .bootstraprc as config file */
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, '../lib-css'), // where to place bootstrap.js and bootstrap.css
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};
