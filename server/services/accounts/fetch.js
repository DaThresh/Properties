const Account = require(DIR + '/models/account');
const success = require('../success');

module.exports = (req, res) => {
    let offset = req.query.offset ? Number(req.query.offset) : 0;
    let count = req.query.count ? Number(req.query.count) : 10;
    Account.find({}).skip(offset).limit(count).select('-password -__v')
    .then(accounts => success(res, {accounts}))
    .catch(error => Errors.response(res, error));
}