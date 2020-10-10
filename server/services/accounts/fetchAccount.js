const Account = require(DIR + '/models/organizations/account');
const success = require('../success');

module.exports = (req, res) => {
    req.account.populate('organization', 'name id images').execPopulate()
    .then(account => success(res, {
        role: account.role,
        admin: account.organization._id.equals(global.adminOrganization),
        organization: account.organization,
        userName: account.fullName,
        managerRole: global.managerRole,
        settings: {...Account.defaultSettings(), ...(account.settings ? account.settings.toJSON() : {})},
    }))
    .catch(error => Errors.response(res, error));
}