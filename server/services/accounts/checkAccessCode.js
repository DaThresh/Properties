const Account = require(DIR + '/models/organizations/account');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['email', 'accessCode'])
    .then(() => Account.findOne({email: { $regex: new RegExp('^' + String(req.body.email) + '$', 'i') }, accessCode: String(req.body.accessCode)}))
    .then(account => {
        if(!account) return Promise.reject({notFound: true});
    })
    .then(() => success(res, {active: true}))
    .catch(error => Errors.response(res, error));
}