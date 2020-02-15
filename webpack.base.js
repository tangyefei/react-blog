const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: path.join(__dirname, 'src/index.html'), 
      filename: 'index.html', 
      chunks: ['index'], 
      inject: true
    })
  ],
  module: {
    rules: [{
      test: /\.js$/, use: 'babel-loader'
    }]
  }
}
