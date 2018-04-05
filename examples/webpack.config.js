const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV

const rules = []

rules.push({
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/
})

rules.push({
  test: /\.scss$/,
  use: [{
    loader: "style-loader"
  }, {
    loader: "css-loader",
    options: {
      importLoaders: 1,
      sourceMap: true,
      modules: true,
      localIdentName: '[name]-[local]-[hash:base64:5]',
      minimize: false,
      discardComments: {
        removeAll: true
      }
    }
  }, {
    loader: "sass-loader"
  }]
})

const config = {
  context: __dirname,
  mode: 'development',
  entry: './index.js',
  module: {
    rules
  },
  output: {
    path: path.resolve(__dirname, '../dist-examples')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}

module.exports = config
