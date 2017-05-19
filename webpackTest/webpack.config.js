var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
module.exports = {
  entry: ['./index.js','./index.css','./index2.js'],
  output: {
    filename: 'index.bundle.js',
    chunkFilename : './index2.js',
  },
module: {
 loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            }
        ]
},
plugins: [
  new HtmlWebpackPlugin(),
  new ExtractTextPlugin({filename:"[name].bundle.css"}),
  new HtmlWebpackIncludeAssetsPlugin({ assets: [], append: true })
]
};
