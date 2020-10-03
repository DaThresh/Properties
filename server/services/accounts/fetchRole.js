const success = require('../success');

module.exports = (req, res) => {
    req.account.populate('organization').execPopulate()
    .then(account => success(res, {
        role: account.role,
        admin: account.organization._id.equals(global.adminOrganization),
        organizationName: account.organization.name,
        userName: account.fullName,
        managerRole: global.managerRole,
    }))
    .catch(error => Errors.response(res, error));
}