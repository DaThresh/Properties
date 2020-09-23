module.exports = {
    output: {
        filename: 'appBundle.js',
        path: `${__dirname}/public/`,
        publicPath: '/'
    },
    stats: 'normal',
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
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
};