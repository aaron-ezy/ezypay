const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  mode: production ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: production ? 'budget.min.js' : 'budget.js',
    sourceMapFilename: production ? 'budget.min.js.map' : 'budget.js.map',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: 'firefox',
  },
  devtool: 'source-map',
  watch: !production,
  target: 'web',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          
          MiniCssExtractPlugin.loader,
          {
              loader: 'css-loader',
              options: { sourceMap: true },
          },
          {
              loader: 'sass-loader',
              options: { sourceMap: true },
          },
      ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]

  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin(),
  ]
};
