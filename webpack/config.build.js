const Extract = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const Webpack = require('webpack');

const config = require('./config');

const publicPath = process.env.npm_package_config_public_path;

module.exports = merge(config, {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: Extract.extract([
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]),
      }
    ],
  },
  output: {
    publicPath: publicPath,
  },
  plugins: [
    new Extract('[hash].css'),
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        booleans: true,
        collapse_vars: true,
        comparisons: true,
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        if_return: true,
        join_vars: true,
        loops: true,
        properties: true,
        sequences: true,
        unused: true,
        warnings: false,
      },
    }),
  ],
});