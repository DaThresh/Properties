const Account = require(DIR + '/models/organizations/account');
const bcrypt = require('bcrypt');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['email', 'accessCode', 'password', 'confirmPassword'])
    .then(() => Account.findOne({email: { $regex: new RegExp('^' + String(req.body.email) + '$', 'i') }, accessCode: String(req.body.accessCode)}))
    .then(account => {
        if(!account) return Promise.reject({notFound: true});
        var rawPassword = String(req.body.password);
        if(rawPassword !== String(req.body.confirmPassword)) return Promise.reject({invalid: 'Passwords do not match'});
        if(rawPassword.length < 8) return Promise.reject({invalid: 'Password must be at least 8 characters'});
        account.password = bcrypt.hashSync(rawPassword, 10);
        account.accessCode = undefined;
        return account.save()
    })
    .then(() => success(res))
    .catch(error => Errors.response(res, error));
}