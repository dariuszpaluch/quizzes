const path = require('path');

const Sync = require('browser-sync-webpack-plugin');
const merge = require('webpack-merge');
const Webpack = require('webpack');

const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const compress = require('compression');
const webpackServeWaitpage = require('webpack-serve-waitpage');
const internalIp = require('internal-ip');

const config = require('./config');

const packageJSON = require(path.resolve(__dirname, '../package.json'));
const PUBLIC_PATH = process.env.PUBLIC_URL || packageJSON.config.public_path;
const port = packageJSON.config.port;
const publicPath =  packageJSON.config.public_path;

module.exports = merge(config, {
  mode: 'development',
  devtool: '#eval-source-map',
  serve: {
    content: 'build',
    host: '0.0.0.0',
    hot: {
      host: {
        server: '0.0.0.0',
        client: internalIp.v4.sync()
      }
    },
    port: port,
    add: (app, middleware, options) => {
      app.use(webpackServeWaitpage(options, {
        theme: 'dark',
        title: packageJSON.name,
      }));
      app.use(convert(compress()));
      app.use(convert(history({})));
    },
    clipboard: false
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      }
    ]
  },
  output: {
    publicPath: 'http://localhost:' + port + publicPath,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  plugins: [
    new Webpack.DefinePlugin({
      'WEBPACK_API_URL': JSON.stringify('http://localhost:3000'),
    }),
    new Webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
    new Webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

});
