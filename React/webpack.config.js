const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = () => {
  return {
    entry: ["babel-polyfill", "./src/index.js"],
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"]
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        title: "Caching"
      }),
      new CleanWebpackPlugin(["dist"]),
      new MiniCssExtractPlugin({
        filename: "style.[contenthash].css"
      }),
      new Dotenv(),
    ],
    output: {
      path: path.join(__dirname, "/build"),
      filename: "[name].[hash].js",
      publicPath: "/"
    },

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    devServer: {
      historyApiFallback: true
    }
  };
};
