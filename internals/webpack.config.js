const Dotenv = require("dotenv-webpack");

module.exports = {
  devtool: "inline-source-map",
  mode: "development",
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
  plugins: [new Dotenv()],
  target: "node",
};
