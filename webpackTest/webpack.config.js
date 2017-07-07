
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
module.exports = {
  entry:{ app:['./index.js','./index.css','./index2.js'],
  vendor: ['angular','jquery']},
  output: {
    filename: '[name].bundle.js',
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
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
  new ExtractTextPlugin({filename:"app.bundle.css"}),
]
};
