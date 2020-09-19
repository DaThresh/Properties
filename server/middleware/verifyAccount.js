const jwt = require('jsonwebtoken');
const Account = require(DIR + '/models/account');

// Will not pass if not valid token
// Makes available req.account if valid

module.exports = (req, res, next) => {
    let authorization = req.headers.authorization;
    if(!authorization) return Errors.response(res, {invalid: 'Invalid token'});
    if(authorization.startsWith('Bearer ') || authorization.startsWith('bearer ')){
        authorization = authorization.slice(7);
    }
    jwt.verify(authorization, TOKEN['KEY'], (err, data) => {
        if(err) Errors.response(res, {invalid: 'Invalid token'});
        else {
            Account.findById(data.accountId)
            .then(account => {
                if(!account) return Promise.reject({});
                req.account = account;
                next();
            }).catch(err => Errors.response(res, {invalid: 'Invalid token'}, 401));
        }
    });
}