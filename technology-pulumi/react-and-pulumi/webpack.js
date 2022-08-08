const path = require('path')
require('dotenv').config()

const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV

if(!['local', 'production'].includes(env)) throw new Error("Invalid NODE_ENV")

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: "tsconfig-webpack.json"
            }
        }
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: env === 'production' ? false : 'source-map' ,
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/static/index.template.ejs',
      inject: 'body',
    }),
  ],
}
