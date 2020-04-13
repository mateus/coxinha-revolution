const merge = require("webpack-merge");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const base = require("./base");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "bundle.min.js"
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
  plugins: [
    new CopyPlugin([
      { from: 'assets', to: 'assets' }
    ])
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
});
