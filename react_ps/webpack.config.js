var webpack = require("webpack");
var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist"); // Where code is going
var SRC_DIR = path.resolve(__dirname, "src"); // Where code comes from

var config = {
	entry: SRC_DIR + "/app/index.js", // first file to start transpiling, which file to bootstrap project
	output: {
		path: DIST_DIR + "/app",
		filename: "bundle.js",
		publicPath: "/app/" // For webpack dev server
	},
	module:{ // Might have no need for modules if using vanilla JS
		loaders: [
			{
				test: /\.js?/, // Look at all JS files
				include: SRC_DIR,
				loader: "babel-loader",
				query: {
					presets: ["react", "es2015", "stage-2"] // installed packages in package.json
				}

			}
		]
	}

};

module.exports = config;