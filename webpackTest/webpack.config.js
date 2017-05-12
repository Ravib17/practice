/*var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: {main:["./app","./new"],home:["./home","./home2"] },
  output: {
    filename: "[name].bundle.js"
  },
module:{
  loader : {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
},
  plugins: [
        new ExtractTextPlugin("[name].css")
    ]
}*/
/*var ExtractTextPlugin = require("extract-text-webpack-plugin");
console.log(ExtractTextPlugin);
module.exports = {
    // The standard entry point and output config
    entry: {
        home: "./home",
        home2: "./home2"
    },
    output: {
        filename: "[name].js",
        chunkFilename: "[id].js"
    },
    module: {
        loaders:[ {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader","css-loader"),
            },],
    },
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("[name].bundle.css")
    ]
}*/

/*module.exports = {
  entry: {home:["./home.css"],home2:["./home2.css"] },
  output: {
    filename: "[name].bundle.css"
  },
module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}*/

var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    // The standard entry point and output config
    entry: {
        home: "./home.css",
        home2: "./home2.css",
    },
    output: {
        filename: "[name].js",
        chunkFilename: "[id].js"
    },
    module: {
        loaders: [
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            },
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use:"css-loader!less-loaer"})
            }
            // You could also use other loaders the same way. I. e. the autoprefixer-loader
        ]
    },
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("[name].files.css")
    ]
}

