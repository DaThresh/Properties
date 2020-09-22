const success = require('../success');

module.exports = (req, res) => {
    success(res, {
        role: req.account.role,
        adminRole: global.ADMINROLE,
    });
}