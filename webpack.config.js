var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDOR_LIBS = [
  "axios",
  "lodash",
  "history",
  "react",
  "react-dom",
  "react-redux",
  "react-router-dom",
  "redux",
  "redux-form",
  "redux-thunk",
  "prop-types"
];

module.exports = {
  entry: {
    bundle: './client/src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_module/
      },
      {
        loader: ExtractTextPlugin.extract({
            loader: 'css-loader'
        }),
         test: /\.css$/
     },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: './client/src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: 'style.[chunkhash].css'
    })
  ]
};