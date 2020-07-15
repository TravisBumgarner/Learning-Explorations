const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'lib'),
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.template.ejs' })],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
        ],
    },
}
