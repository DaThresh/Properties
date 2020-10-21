const yaml = require('js-yaml');
const fs = require('fs');

try {
    let doc = fs.readFileSync(DIR + '/config.yml', 'utf8');
    let data = yaml.safeLoad(doc);

    global.PORT = data.port;
    global.ENVIRONMENT = data.environment;
    global.ENABLEHMR = data.hmr;

    global.managerRole = data.managerRole;

    let token = data.token;
    global.TOKEN = {
        EXPIRE: token.expire,
        REMEMBER: token.expireRemember,
        KEY: token.key,
    }

    let database = data.database;
    global.DATABASE = {
        NAME: database.name,
        HOST: database.host,
        PORT: database.port,
        USERNAME: database.username,
        PASSWORD: database.password,
        SRV: database.srv,
        OPTIONS: database.options ? database.options : {},
    }

    global.FILES = {
        LOCAL: data.files.local,
    }

    let logging = data.logging;
    global.LOGGING = {
        SKIP: logging.skip ? logging.skip : [],
    }
} catch (err) {
    Errors.fatal(err, 'Failed to load configuration in config.yml');
}