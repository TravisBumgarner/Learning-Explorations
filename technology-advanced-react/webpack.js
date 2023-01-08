const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'build'),
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
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/static/index.template.ejs',
      favicon: './src/static/favicon.png',
      inject: 'body',
    }),
  ],
}
