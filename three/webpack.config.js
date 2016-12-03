var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    './src/app',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader'
      }
    ]
  }
}
