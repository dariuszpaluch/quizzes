const Sync = require('browser-sync-webpack-plugin');
const merge = require('webpack-merge');
const Webpack = require('webpack');

const config = require('./config');

const port = process.env.npm_package_config_port;
const publicPath = process.env.npm_package_config_public_path;

module.exports = merge(config, {
  devtool: '#eval-source-map',
  devServer: {
    contentBase: 'build',
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true" },
    historyApiFallback: {
      disableDotRule: true
    },
    hot: true,
    inline: true,
    port: parseInt(port) - 1,
    host: '0.0.0.0'
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
    publicPath: publicPath,
  },

  plugins: [
    new Webpack.DefinePlugin({
      'WEBPACK_API_URL': JSON.stringify('http://localhost:3000')
    }),
    new Sync({
      host: 'localhost',
      logLevel: 'silent',
      notify: false,
      open: false,
      port: parseInt(port),
      proxy: 'http://localhost:' + (parseInt(port) - 1) + publicPath,
      ui: false,
    }, {
        reload: false,
      }),
    new Webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new Webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new Webpack.NoEmitOnErrorsPlugin()
    // do not emit compiled assets that include errors
  ],

});