/* eslint-disable no-var */
var autoprefixer = require('autoprefixer');
var path = require('path');
var strip = require('strip-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2', // necessary for the babel plugin
    path: path.resolve(__dirname, '../lib-css'), // where to place webpack files
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              sourceMap: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function (loader) {
                return [ autoprefixer({ browsers: [ '> 1%' ] }) ]
              }
            }}, 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function (loader) {
                return [ autoprefixer({ browsers: [ '> 1%' ] }) ]
              }
            }
          }]
        })
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml'
          }
        }]
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin(`${path.parse(process.argv[2]).name}.css`)
  ]
}
