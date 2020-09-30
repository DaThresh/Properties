const success = require('../success');

module.exports = (req, res) => {
    success(res, {
        role: req.account.role,
        admin: req.account.organization.equals(global.adminOrganization),
        managerRole: global.managerRole,
    });
}