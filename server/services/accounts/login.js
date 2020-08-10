const Account = require(DIR + '/models/account');
const fields = require(DIR + '/validations/fields');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const success = require('../success');

var rejection = {invalid: 'Invalid login credentials'};

module.exports = (req, res) => {
    var accountId;
    fields(req.body, ['email', 'password'])
    .then(() => Account.findOne({email: String(req.body.email)}))
    .then(account => {
        if(!account) return Promise.reject(rejection);
        if(!bcrypt.compareSync(String(req.body.password), account.password)) return Promise.reject(rejection);
        accountId = account._id;
        return account.updateOne({lastLogin: new Date()})
    })
    .then(() => success(res, {token: jwt.sign({accountId}, TOKEN['KEY'], {expiresIn: TOKEN['EXPIRE']})}))
    .catch(error => Errors.response(res, error));
}