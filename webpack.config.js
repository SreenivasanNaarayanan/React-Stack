var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel?cacheDirectory&sourceMap'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './client',
    hot: true,
    noInfo: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

};