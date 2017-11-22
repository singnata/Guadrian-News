const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: "./src/app.module.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }  
    ],
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new UglifyJsPlugin({
      uglifyOptions: {
        mangle: false
      }
    })
  ]
};
