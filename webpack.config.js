module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  module: {
    // Use `ts-loader` on any file that ends in '.ts'
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  // Bundle '.ts' files as well as '.js' files.
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "main.js",
    path: `${process.cwd()}/dist`,
  },
  externals: {
    lodash: "commonjs lodash",
  },
};
