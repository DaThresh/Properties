module.exports = (req, res, next) => {
    if(req.account.organization.equals(global.adminOrganization)) next();
    else Errors.response(res, {authorization: true});
}