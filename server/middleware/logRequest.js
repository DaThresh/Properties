module.exports = (req, res, next) => {
    let path = req.path;
    let dontLog = LOGGING.SKIP;
    let found = false;
    for(var i = 0; i < dontLog.length; i++){
        if(path.endsWith(dontLog[i])){
            found = true;
            break;
        }
    }
    if (!found) Logger.request(req);
    next();
}