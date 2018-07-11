'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('./plugins/clean-plugin');

const config = {
  entry: path.join(__dirname, './app/public/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/bundle.js'
  },
  mode: 'development',
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  plugins: [
    new CleanPlugin({
      files: ['dist/static/*']
    }),
    new ExtractTextPlugin('css/bundle.css', { allChunks: true })
  ],
  module: {
    exprContextCritical: false,
    rules: [
      {
      test: /\.(js|jsx)$/,
      loaders: 'babel-loader',
      include: path.join(__dirname, 'app/public/'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!resolve-url-loader!sass-loader?sourceMap&importLoaders=1'
        }),
        include: path.join(__dirname, 'app/public/')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!resolve-url-loader?sourceMap&importLoaders=1'
        }),
      },
      {
        test: /\.(ico|svg|png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name]-[hash].[ext]',
            limit: 30000,
            outputPath: 'images',
          }
        }]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  }
};
module.exports = config;