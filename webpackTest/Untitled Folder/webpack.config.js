var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
module.exports = {
  entry: './newblock.js',
  output: {
    filename: 'newblock_bundle.js'
  },
module: {
  loaders: [
  ]
},
plugins: [
  new HtmlWebpackPlugin(),

]
};
