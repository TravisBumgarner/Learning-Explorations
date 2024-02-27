const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

let __STATIC__
if (process.env.NODE_ENV === 'production') {
  __STATIC__ = '"someprodurl"'
} else {
  __STATIC__ = '"http://localhost:3001/public/"'
}


module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'app.[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
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
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      sharedComponents: path.resolve(__dirname, 'src/sharedComponents/'),
      sharedTypes: path.resolve(__dirname, 'src/sharedTypes/index.ts'),
      theme: path.resolve(__dirname, 'src/theme.ts'),
      utilities: path.resolve(__dirname, 'src/utilities.ts'),
      context: path.resolve(__dirname, 'src/Context.tsx')
    },
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 3001,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({ __STATIC__ }),
    new HtmlWebpackPlugin({
      template: './src/static/index.template.ejs',
      favicon: './src/static/favicon.png',
      inject: 'body',
    }),
  ],
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
}
