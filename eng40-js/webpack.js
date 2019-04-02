const path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        app: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            SharedComponents: path.resolve(__dirname, 'src/sharedComponents/'),
            Theme: path.resolve(__dirname, 'src/theme.js'),
            Content: path.resolve(__dirname, 'src/content')
        }
    },
    devtool: 'inline-source-map',
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
