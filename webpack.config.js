const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const env = process.env.NODE_ENV

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
}

const propTypesExternal = {
  root: 'PropTypes',
  commonjs2: 'prop-types',
  commonjs: 'prop-types',
  amd: 'prop-types'
}

const reduxExternal = {
  root: 'Redux',
  commonjs2: 'redux',
  commonjs: 'redux',
  amd: 'redux'
}

const reactReduxExternal = {
  root: 'ReactRedux',
  commonjs2: 'react-redux',
  commonjs: 'react-redux',
  amd: 'react-redux'
}

const immutableExternal = {
  root: 'Immutable',
  commonjs2: 'immutable',
  commonjs: 'immutable',
  amd: 'immutable'
}

const reselectExternal = {
  commonjs2: 'reselect',
  commonjs: 'reselect',
  amd: 'reselect'
}

const rules = []

rules.push({
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/
})

const config = {
  mode: env,
  externals: {
    react: reactExternal,
    redux: reduxExternal,
    immutable: immutableExternal,
    reselect: reselectExternal,
    'react-redux': reactReduxExternal,
    'prop-types': propTypesExternal
  },
  module: {
    rules
  },
  output: {
    library: 'ReduxSignal',
    libraryTarget: 'umd'
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

module.exports = config
