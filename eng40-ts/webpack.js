const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        app: "./index.tsx"
    },
    output: {
        filename: "app.bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    devServer: {
        publicPath: '/',
        contentBase: path.resolve(__dirname, './'),
        port: 3000,
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};

// module.exports = {
//     entry: {
//         app: './src/index.tsx'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader',
//                 query: {
//                     presets: ['@babel/preset-env', '@babel/preset-react']
//                 }
//             }
//         ]
//     },
//     output: {
//         filename: '[name].bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     resolve: {
//         alias: {
//             SharedComponents: path.resolve(__dirname, 'src/sharedComponents/'),
//             Theme: path.resolve(__dirname, 'src/theme.js'),
//             Content: path.resolve(__dirname, 'src/content')
//         }
//     },
//     devtool: 'inline-source-map',

//     devtool: 'source-map',
//     plugins: [
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: JSON.stringify('production')
//             }
//         })
//     ]
// }
