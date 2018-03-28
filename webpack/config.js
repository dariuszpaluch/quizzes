const path = require('path');

const autoprefixer = require('autoprefixer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const Html = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.resolve('./'),
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, '../src/styles/index.scss'),
    path.resolve(__dirname, '../src/index.js')
  ],
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        test: /(\.jpg|\.png|\.otf|\.woff|\.woff2|\.ttf|\.eot|\.svg)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ],
  },
  output: {
    filename: '[hash].js',
    path: path.resolve('./build'),
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("../package.json").version),
    }),
    new webpack.ProvidePlugin({
      moment: 'moment',
    }),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new FaviconsWebpackPlugin({
    //   logo: '', //TODO add favicon path
    //   prefix: './assets/favicon/',
    //   emitStats: true,
    //   statsFilename: 'iconstats.json',
    //   persistentCache: true,
    //   inject: true,
    //   background: '#fff',
    //   title: 'Dittoav-UI',
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: true,
    //     coast: { offset: 10 },
    //     favicons: true,
    //     firefox: true,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: true
    //   }
    // }),
    new Html({
      minify: {
        collapseWhitespace: true,
      },
      showErrors: true,
      template: path.resolve(__dirname, '../src/index.html')
    }),
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'defer'
    // }),
  ],
  resolve: {
    alias: {
      actions:    path.resolve('./src/actions'),
      assets:     path.resolve('./assets'),
      styles:     path.resolve('./src/styles'),
      components: path.resolve('./src/components'),
      containers: path.resolve('./src/containers'),
      reducers:   path.resolve('./src/reducers'),
      libs:       path.resolve('./src/libs'),
      modules:    path.resolve('./src/modules'),
      consts:     path.resolve('./src/consts'),
      utils:      path.resolve('./src/utils'),
      config:     path.resolve('./src/config'),
      sources:    path.resolve('./src/sources'),
      src:        path.resolve('src'),
    }
  }
};