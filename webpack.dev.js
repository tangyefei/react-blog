
const baseWebpackConfig = require('./webpack.base')
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig,{
  mode: "development",
  devServer:{
    contentBase: "./dist",
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
