const dotenv = require("dotenv-webpack");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "inline-source-map",
  mode: "development",
  entry: {
    index: "./src/index.js",
    trader: "./src/trader.js",
  },
  output: {
    path: path.resolve(__dirname, ".."),
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        type: "javascript/auto",
        test: /\.mjs$/,
        use: [],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new dotenv(),
    // This is to remove a warning about a dependency being an expression
    new webpack.ContextReplacementPlugin(/encoding/),
  ],
  target: "node",
};
