const express = require('express');
const app = express();

global.DIR = __dirname;
global.Errors = require(DIR + '/utilities/Errors');
global.Logger = require(DIR + '/utilities/Logger');
Logger.log('Loaded universal utilities');

require(DIR + '/load/config');
require(DIR + '/load/mongoose');
Logger.log('Loaded configuration');

// Webpack middleware
if(ENVIRONMENT === 'dev'){
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config.js');
  const webpackCompiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { ...webpackConfig.stats }
  }));
  app.use(webpackHotMiddleware(webpackCompiler, {
    log: console.log,
    path: '/__webpack_hmr'
  }));
}

app.use(express.json());
app.use(express.static(`${__dirname}/../public/`));
app.use(require(DIR + '/middleware/logRequest'));
Logger.log('Loaded universal middleware');

require(DIR + '/routes/accounts')(app);
require(DIR + '/routes/properties')(app);
require(DIR + '/services/serve')(app);
Logger.log('Loaded routes');

app.listen(PORT, () => Logger.log('Server now listening on port ' + PORT));