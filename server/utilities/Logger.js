const chalk = require('chalk');

class Logger{
    log(message){
        console.log(Logger.getTimestamp() + ' ' + message);
    }

    error(message){
        console.error(chalk.red(Logger.getTimestamp() + ' ' + message));
    }

    info(message){
        console.info(chalk.blue(Logger.getTimestamp() + ' ' + message));
    }

    request(request){
        console.log(Logger.getTimestamp() + ' ' + request.method + ' request to ' + request.path);
    }

    static getTimestamp(){
        let date = new Date();
        let strDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        let strTime = date.getHours() + ':' + date.getMinutes() + ':'  + date.getSeconds() + ':' + date.getMilliseconds();
        return strDate + ' ' + strTime;
    }
}

module.exports = new Logger();