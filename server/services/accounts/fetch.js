const Account = require(DIR + '/models/account');
const success = require('../success');

module.exports = (req, res) => {
    let offset = req.params.offset ? Number(req.params.offset) : 0;
    let count = req.params.count ? Number(req.params.count) : 10;
    Account.find({}).skip(offset).limit(count)
    .then(accounts => success(res, {accounts}))
    .catch(error => Errors.response(res, error));
}