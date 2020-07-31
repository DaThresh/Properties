/* eslint-disable sort-keys */
const webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    'react-hot-loader/patch',
    './client/index.js'
  ],
  mode: 'development',
  module: {
    rules: [
      // es-lint loader prevents compiling
      // {
      //   enforce: 'pre',
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: 'eslint-loader'
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  },
  output: {
    filename: 'appBundle.js',
    path: `${__dirname}/public/`,
    publicPath: '/'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['*', '.js', '.jsx']
  },
  stats: {
    assets: false,
    assetsSort: 'index',
    builtAt: false,
    moduleAssets: false,
    cached: false,
    cachedAssets: false,
    modules: false,
    chunks: true,
    chunkOrigins: false,
    chunksSort: 'size',
    colors: true,
    depth: false,
    entrypoints: false,
    env: true,
    errors: true,
    errorDetails: true,
    hash: false,
    logging: 'info',
    loggingTrace: true,
    maxModules: 8,
    modulesSort: 'size',
    moduleTrace: true,
    outputPath: false,
    performance: true,
    providedExports: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: false,
    version: true,
    warnings: true,
    all: undefined
  }
};
