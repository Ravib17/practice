
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry:{ app : ['./index.js','./index.css','./index2.js']},
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

  new ExtractTextPlugin({filename:"[name].bundle.css"})
]
};
