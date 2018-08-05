module.exports = {
  devtool: "inline-source-map",
  mode: "development",
  target: "node",
  module: {
    rules: [
      {
        type: "javascript/auto",
        test: /\.mjs$/,
        use: [],
      },
    ],
  },
};
