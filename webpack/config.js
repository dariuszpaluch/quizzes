const path = require('path');

const autoprefixer = require('autoprefixer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const Html = require('html-webpack-plugin');
const webpack = require('webpack');

const packageJSON = require(path.resolve(__dirname, '../package.json'));
const PUBLIC_PATH = process.env.PUBLIC_URL || packageJSON.config.public_path;

module.exports = {
  context: path.resolve(__dirname, '../'),
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
    path: path.resolve(__dirname, '../build'),
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJSON.version),
      PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
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
      actions: path.resolve(__dirname, '../src/actions'),
      assets: path.resolve(__dirname, '../assets'),
      styles: path.resolve(__dirname, '../src/styles'),
      components: path.resolve(__dirname, '../src/components'),
      containers: path.resolve(__dirname, '../src/containers'),
      reducers: path.resolve(__dirname, '../src/reducers'),
      libs: path.resolve(__dirname, '../src/libs'),
      modules: path.resolve(__dirname, '../src/modules'),
      consts: path.resolve(__dirname, '../src/consts'),
      utils: path.resolve(__dirname, '../src/utils'),
      config: path.resolve(__dirname, '../src/config'),
      sources: path.resolve(__dirname, '../src/sources'),
      src: path.resolve(__dirname, '../src'),
    }
  }
};