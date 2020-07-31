const Account = require("../models/account");

const AccountServices = {
    create: require(DIR + '/services/accounts/create'),
    login: require(DIR + '/services/accounts/login'),
    changePassword: require(DIR + '/services/accounts/changePassword'),
}

const Middleware = {
    addAccount: require(DIR + '/middleware/addAccount'),
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
}

module.exports = (app) => {
    app.post('/api/accounts', Middleware.addAccount, AccountServices.create);
    app.post('/api/accounts/login', AccountServices.login);

    app.put('/api/accounts/password', Middleware.verifyAccount, AccountServices.changePassword);
}