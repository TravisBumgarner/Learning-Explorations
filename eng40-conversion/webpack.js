const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: './src/index.tsx'
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            SharedComponents: path.resolve(__dirname, '.src/sharedComponents/')
        }
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    devServer: {
        publicPath: '/',
        contentBase: path.resolve(__dirname, './dist'),
        port: 3000,
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            template: './index.template.ejs',
            inject: 'body'
        })
    ]
}
