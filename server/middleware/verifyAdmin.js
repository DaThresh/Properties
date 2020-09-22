module.exports = (req, res, next) => {
    if(req.account.role > global.ADMINROLE) next();
    else Errors.response(res, {unauthorized: 'Not authorized to access this endpoint'}, 401);
}