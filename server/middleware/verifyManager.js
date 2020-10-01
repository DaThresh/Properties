module.exports = (req, res, next) => {
    if(req.account.role >= global.managerRole) next();
    else Errors.response(res, {authorization: true});
}