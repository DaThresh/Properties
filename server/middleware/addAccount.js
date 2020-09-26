const jwt = require('jsonwebtoken');
const Account = require(DIR + '/models/organizations/account');

// Makes available req.account if valid

module.exports = (req, res, next) => {
    let authorization = req.headers.authorization;
    if(!authorization) return next();
    if(authorization.startsWith('Bearer ') || authorization.startsWith('bearer ')){
        authorization = authorization.slice(7);
    }
    jwt.verify(authorization, TOKEN['KEY'], (err, data) => {
        if(err) return next();
        Account.findById(data.accountId)
        .then(account => {
            if(account) req.account = account;
        })
        .catch(err => {})
        .finally(() => {
            next();
        })
    });
}