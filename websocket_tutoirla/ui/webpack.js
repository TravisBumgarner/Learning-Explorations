const path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
    return {
        entry: {
            app: './src/index.js'
        },
        module: {
            rules: [
                {
                    test: /\.[jt]s[x]?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                }
            ]
        },
        output: {
            filename: '[name]-[hash].bundle.js',
            path: path.resolve(__dirname, 'public'),
            publicPath: '/'
        },
        resolve: {
            extensions: ['.js']
        },
        devServer: {
            contentBase: './public',
            port: 3000,
            historyApiFallback: true,
            publicPath: '/'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.template.ejs',
                inject: 'body'
            })
        ]

    }
}