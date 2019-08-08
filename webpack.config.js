const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
console.log(path.resolve(__dirname, 'dist'))
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9000,
    hot: true,
    open: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
