const path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        app: './src/index.tsx'
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: "/build/",
        path: "./dist/build/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    devServer: {
        publicPath: '/',
        contentBase: './dist',
        port: 3000,
        historyApiFallback: true
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
}
