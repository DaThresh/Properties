const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        'react-hot-loader/patch',
        './client/index.js'
    ],
    devtool: 'eval-source-map',
    plugins: [new webpack.HotModuleReplacementPlugin(),
              new webpack.DefinePlugin({
                'ENVIRONMENT': JSON.stringify('development'),
              }),
    ],
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      },
      extensions: ['*', '.js', '.jsx'],
    },
});