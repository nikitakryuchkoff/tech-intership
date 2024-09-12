import path from 'path';
import { fileURLToPath } from 'url';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';

const isProduction = process.env.NODE_ENV === 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction
      ? 'static/js/[name].[contenthash].js'
      : 'static/js/[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isProduction
        ? 'static/css/[name].[contenthash].css'
        : 'static/css/[name].css',
    }),
    new Dotenv(),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 9000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};
