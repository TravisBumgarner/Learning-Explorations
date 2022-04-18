const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'react-dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            sharedComponents: path.resolve(__dirname, 'src/sharedComponents/'),
            sharedTypes: path.resolve(__dirname, 'src/sharedTypes/index.ts'),
            theme: path.resolve(__dirname, 'src/theme.tsx'),
            utilities: path.resolve(__dirname, 'src/utilities/'),
        },
    },
    devServer: {
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.template.ejs',
            inject: 'body',
        }),
    ],
}
