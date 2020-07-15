const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/App.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'lib'),
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.template.ejs' })],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
    },
}
