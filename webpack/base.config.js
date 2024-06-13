import MiniCssExtractPlugin, { loader as _loader } from 'mini-css-extract-plugin';
import { join } from "path";

// Function to resolve paths
function resolvePath(dir) {
  return join(__dirname, dir); // Adjusted based on your project structure
}

export const entry = {
  main: ["@babel/polyfill", resolvePath("./src/index.jsx")],
};
export const output = {
  path: resolvePath("dist"),
  filename: "js/[name].bundle.js",
  publicPath: "/",
};
export const module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"], // Example presets
        },
      },
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        _loader,
        "css-loader",
        "sass-loader",
      ],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            limit: 10000,
            outputPath: "images",
            name: "[name].[hash].[ext]",
          },
        },
      ],
    },
  ],
};
export const resolve = {
  extensions: [".js", ".jsx"], // Ensure JSX files are resolved correctly
  modules: [resolvePath("src"), "node_modules"],
};
export const plugins = [
  new MiniCssExtractPlugin({
    filename: "css/[name].css",
    chunkFilename: "css/[name].[contenthash]_[id].css",
  }),
];
