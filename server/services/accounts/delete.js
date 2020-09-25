const Account = require(DIR + '/models/account');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.params, ['accountId'])
    .then(() => {
        if(req.account.id != req.params.accountId) return Promise.reject({invalid: 'You cannot delete another account'});
        return Account.findByIdAndRemove(req.params.accountId)
    })
    .then(() => success(res))
    .catch(error => Errors.response(res, error));
}