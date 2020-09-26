const Account = require(DIR + '/models/organizations/account');
const fields = require(DIR + '/validations/fields');
const bcrypt = require('bcrypt');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['email', 'password', 'firstName', 'lastName'])
    .then(() => Account.countDocuments())
    .then(count => {
        if(count === 0){
            var newAccount = buildAccount(req.body, true);
        } else {
            if(!req.account) return Promise.reject({authorization: true})
            if(!req.body.confirmPassword) return Promise.reject({required: 'confirmPassword is required'})
            if(req.body.password.length < 6) return Promise.reject({invalid: 'Password must be at least 6 characters long'})
            if(req.body.password != req.body.confirmPassword) return Promise.reject({invalid: "Passwords don't match"})
            var newAccount = buildAccount(req.body);
        }
        return newAccount.save()
    })
    .then(() => success(res, {}, 201))
    .catch(error => Errors.response(res, error));
}

// First account will always have role 900 (root account)
function buildAccount(body, first = false){
    var account = new Account();
    let rawPassword = String(body.password);
    account.email = String(body.email);
    account.organization = first ? global.adminOrganization : req.account.organization;
    account.firstName = String(body.firstName);
    account.lastName = String(body.lastName);
    account.password = bcrypt.hashSync(rawPassword, 10);
    account.role = first ? 900 : 100;
    return account;
}