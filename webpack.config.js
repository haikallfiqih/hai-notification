const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/hai-notification.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'notify.js',
    library: {
      name: 'HaiNotification',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    hot: true,
    open: '/demo/index.html',
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  }
};
