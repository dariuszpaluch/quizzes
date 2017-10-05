const path = require('path');

const Extract = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const Webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const config = require('./config');

const packageJSON = require(path.resolve(__dirname, '../package.json'));

const publicPath = packageJSON.config.publicPath;

function isExternal(module) {
  var context = module.context;

  if (typeof context !== 'string') {
    return false;
  }

  return context.indexOf('node_modules') !== -1;
}

module.exports = merge(config, {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: Extract.extract([
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ])
      }
    ]
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: publicPath
  },
  plugins: [
    new Extract('[name].[chunkhash].css'),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: function(module) {
        return isExternal(module);
      }
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
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
        warnings: false
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});