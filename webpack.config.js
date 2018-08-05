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
    ],
  },
  plugins: [new Dotenv()],
  target: "node",
  watch: true,
};
