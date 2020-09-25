const Account = require(DIR + '/models/account');
const fields = require(DIR + '/validations/fields');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const success = require('../success');

var rejection = {invalid: 'Invalid login credentials'};

module.exports = (req, res) => {
    var accountId;
    fields(req.body, ['email', 'password', 'remember'])
    .then(() => Account.findOne({email: String(req.body.email)}))
    .then(account => {
        if(!account) return Promise.reject(rejection);
        if(!bcrypt.compareSync(String(req.body.password), account.password)) return Promise.reject(rejection);
        accountId = account.id;
        return account.updateOne({lastLogin: new Date()})
    })
    .then(() => success(res, {token: jwt.sign({accountId}, TOKEN['KEY'], {expiresIn: calculateExpiry(req)})}))
    .catch(error => Errors.response(res, error));
}

function calculateExpiry(request){
    let remember = Boolean(request.body.remember);
    return remember ? TOKEN['REMEMBER'] : TOKEN['EXPIRE'];
}