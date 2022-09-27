const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const NodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

const { getGlobals } = require("./config/get-globals");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const globals = getGlobals();
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const ServerConfig = {
  entry: "./server/index.tsx",
  target: "node",
  externals: [NodeExternals()],
  mode: isDev ? "development" : "production",
  output: {
    path: path.join(__dirname, "build/server"),
    filename: "index.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ejs", ".tsx", ".ts"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "media",
            emitFile: false,
          },
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts",
            emitFile: false,
          },
        },
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              emit: false,
            },
          },
          {
            loader: "css-loader",
          },
          "sass-loader",
        ],
      },
    ],
  },
};

const ClientConfig = {
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    path: path.join(__dirname, "build/client"),
    filename: "js/[name].[contenthash:8].js",
    publicPath: "/",
  },
  mode: isDev ? "development" : "production",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "public", "index_template.ejs"),
      filename: "start-page.html",
      favicon: "src/public/favicon.ico",
      alwaysWriteToDisk: true,
      minify: {
        collapseWhitespace: isProd,
      },
      inject: false,
      templateParameters: (options) => {
        const js = Object.keys(options.assets)
          .filter((el) => /\.js$/.test(el))
          .map((el) => "/" + el);
        const css = Object.keys(options.assets)
          .filter((el) => /\.css$/.test(el))
          .map((el) => "/" + el);
        return {
          css,
          js,
          globals,
        };
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      minify: false,
      template: path.resolve(__dirname, "config", "render-stats.js"),
      filename: path.join(__dirname, "config", "build-stats.json"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "media",
          },
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts",
          },
        },
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          "sass-loader",
        ],
      },
      {
        test: /\.ejs$/,
        use: { loader: "ejs-compiled-loader", options: {} },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ejs", ".tsx", ".ts"],
  },
  optimization: optimization(),
};

module.exports = [ClientConfig, ServerConfig];
