const path = require('path');

module.exports = {
  entry: './src/linter.js',
  output: {
    filename: 'linter.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
      rules: [
        {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env'],
                }
            }
        }
        ]
    }
}