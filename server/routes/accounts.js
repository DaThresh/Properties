const Account = require("../models/account");

const AccountServices = {
    fetchRole: require(DIR + '/services/accounts/fetchRole'),
    fetch: require(DIR + '/services/accounts/fetch'),
    create: require(DIR + '/services/accounts/create'),
    login: require(DIR + '/services/accounts/login'),
    changePassword: require(DIR + '/services/accounts/changePassword'),
    delete: require(DIR + '/services/accounts/delete'),
}

const Middleware = {
    addAccount: require(DIR + '/middleware/addAccount'),
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
    verifyAdmin: require(DIR + '/middleware/verifyAdmin'),
}

module.exports = (app) => {
    // Get routes
    app.get('/api/accounts/role', Middleware.verifyAccount, AccountServices.fetchRole);
    app.get('/api/accounts', Middleware.verifyAccount, Middleware.verifyAdmin, AccountServices.fetch);

    // Post routes
    app.post('/api/accounts', Middleware.addAccount, AccountServices.create);
    app.post('/api/accounts/login', AccountServices.login);

    // Put routes
    app.put('/api/accounts/password', Middleware.verifyAccount, AccountServices.changePassword);

    // Delete routes
    app.delete('/api/accounts/:accountId', Middleware.verifyAccount, AccountServices.delete);
}