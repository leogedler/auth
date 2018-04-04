var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    bundle: ["babel-polyfill", "./client/src/index.js"],
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_module/
      },
      {
        loader: ExtractTextPlugin.extract({
          loader: "css-loader"
        }),
        test: /\.css$/
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: { limit: 40000 }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: "75-90",
                speed: 3
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new HtmlWebpackPlugin({
      template: "./client/src/index.html"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin({
      filename: "style.[chunkhash].css"
    })
  ]
};
