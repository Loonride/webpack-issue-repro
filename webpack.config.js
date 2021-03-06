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
    port: 9000,
    hotOnly: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
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
