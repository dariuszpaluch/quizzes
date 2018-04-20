const path = require('path');

const Sync = require('browser-sync-webpack-plugin');
const merge = require('webpack-merge');
const Webpack = require('webpack');

const config = require('./config');


const packageJSON = require(path.resolve(__dirname, '../package.json'));
const PUBLIC_PATH = process.env.PUBLIC_URL || packageJSON.config.public_path;
const port = packageJSON.config.port;

module.exports = merge(config, {
  devtool: '#eval-source-map',
  devServer: {
    contentBase: 'build',
    hot: true,
    inline: true,
    port: parseInt(port) - 1,
    host: '0.0.0.0',
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true" },
    historyApiFallback: {
      disableDotRule: true
    }
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
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: PUBLIC_PATH,
  },

  plugins: [
    new Webpack.DefinePlugin({
      'WEBPACK_API_URL': JSON.stringify('http://localhost:3000'),
    }),
    new Sync({
      host: 'localhost',
      logLevel: 'silent',
      notify: false,
      open: false,
      ghostMode: false,
      port: parseInt(port),
      proxy: 'http://localhost:' + (parseInt(port) - 1) + PUBLIC_PATH,
      ui: false,
    }, {
        reload: false,
      }),
    new Webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new Webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new Webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new Webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

});