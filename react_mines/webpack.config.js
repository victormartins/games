// path is a core node.js module useful to manipulate file paths
const path = require('path');

// Library we instaled using npm
// This is a Plugin that simplifies creation of HTML files to serve your bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // entry file for react.
  output: {
    // this is were the transpiled files will be
    path: path.join(__dirname, '/dist'),
    filename: 'index-bundle.js', // this is the file that will aggregate all JS files
  },
  module: {
    // this is where we specify our loader
    rules: [
      {
        test: /\.js$/, // what files to pickup
        exclude: /node_modules/, // what to ignore
        use: {
          loader: 'babel-loader', // Webpack plugin for Babel.
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // template to be used
    }),
  ],
};
