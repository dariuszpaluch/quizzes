const path = require('path');

// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');

const packageJSON = require(path.resolve(__dirname, '../package.json'));

const defaultPageTitle = packageJSON.config.page_title;

module.exports = {
  context: path.resolve('./'),
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, '../src/styles/index.scss'),
    path.resolve(__dirname, '../src/index.js')
  ],
  module: {
    rules: [
      {
        test: /(\.jpg|\.png|\.otf|\.woff|\.woff2|\.ttf|\.eot)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, '../build')
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: packageJSON.config.version,
      DEFAULT_PAGE_TITLE: defaultPageTitle
    }),
    new webpack.ProvidePlugin({
      moment: 'moment'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new FaviconsWebpackPlugin({
    //   prefix: './assets/favicon/',
    //   emitStats: true,
    //   statsFilename: 'iconstats.json',
    //   persistentCache: true,
    //   inject: true,
    //   background: '#fff',
    //   title: defaultPageTitle,
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
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      tittle: JSON.stringify(defaultPageTitle),
      showErrors: true,
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
  ],
  resolve: {
    alias: {
      actions: path.resolve(__dirname, '../src/actions'),
      assets: path.resolve(__dirname, '../assets'),
      styles: path.resolve(__dirname, '../src/styles'),
      components: path.resolve(__dirname, '../src/components'),
      libs: path.resolve(__dirname, '../src/libs'),
      modules: path.resolve(__dirname, '../src/modules'),
      consts: path.resolve(__dirname, '../src/consts'),
      utils: path.resolve(__dirname, '../src/utils'),
      reducers: path.resolve(__dirname, '../src/reducers'),
      containers: path.resolve(__dirname, '../src/containers')
    }
  }
};