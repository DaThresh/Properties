module.exports = (req, res, next) => {
    Logger.request(req);
    next();
}