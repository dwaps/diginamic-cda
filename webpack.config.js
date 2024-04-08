const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const mode = process?.env?.NODE_ENV ?? "development";

module.exports = {
  mode,
  entry: resolve("src", "index.ts"),
  output: {
    path: resolve("dist"),
    filename: "main.bundle.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: resolve("src", "index.html") }),
    new CompressionWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    liveReload: true,
    hot: false,
    open: true,
  },
};
