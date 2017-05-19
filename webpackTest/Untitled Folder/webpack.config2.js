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
}

var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        home: "./home",
        home2: "./home2",
    },
    output: {
        filename: "[name].bundle.js",
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
        new ExtractTextPlugin({filename:"[name].combine.css"})
    ]
}*/


var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: {
		home: "./home",
		home2: "./home2",
	},
	output: {
		filename: "[name].combine.js"
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{ test: /\.png$/, loader: "file-loader" }
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "[name].combine.css"
		}),
	]
};

