module.exports = (req, res, next) => {
    if(req.account.organization.toLocaleString() === global.adminOrganization) next();
    else Errors.response(res, {authorization: true});
}