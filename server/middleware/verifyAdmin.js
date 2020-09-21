module.exports = (req, res, next) => {
    if(req.account.role > 400) next();
    else Errors.response(res, {unauthorized: 'Not authorized to access this endpoint'}, 401);
}