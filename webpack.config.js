const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'bundle.js'),
  output: {
    // publicPath: 'http://localhost:9000/dist/'
  },
  devServer: {
    contentBase: __dirname,
    publicPath: '/dist/',
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    hotOnly: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    sockHost: 'localhost'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  },
}
