const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.[contenthash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            sharedComponents: path.resolve(__dirname, 'src/sharedComponents/'),
            theme: path.resolve(__dirname, 'src/theme.tsx'),
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    devServer: {
        contentBase: './public',
        port: 3003,
        historyApiFallback: true,
        publicPath: '/'
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.template.ejs' })],
};