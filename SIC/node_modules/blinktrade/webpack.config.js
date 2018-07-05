const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV;
const config = {
  devtool: 'source-map',
  plugins: [],
  entry: './src/index.js',
  target: 'node',
  output: {
    filename: 'blinktrade.js',
    path: path.join(__dirname, './dist'),
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
    }],
  },
};

if (env === 'production') {
  config.output.filename = 'blinktrade.min.js';
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    })
  );
}

module.exports = config;
