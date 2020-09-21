const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/app.tsx',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'app.[contenthash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.template.ejs' })],
};