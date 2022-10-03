const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        popup: path.resolve('src/popup.ts'),
        background: path.resolve('src/background.ts'),
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "src/*.html",
                    to: "[name][ext]",
                    "toType": "template"
                },
                {
                    from: "manifest.json",
                }
            ]
        }),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve('dist'),
    },
}
