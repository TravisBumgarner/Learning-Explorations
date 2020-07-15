const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/app.tsx',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'lib'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.template.ejs' })],
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
        ],
    },
}
