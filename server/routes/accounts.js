const Account = require(DIR + '/models/organizations/account');

const AccountServices = {
    fetchAccount: require(DIR + '/services/accounts/fetchAccount'),
    create: require(DIR + '/services/accounts/create'),
    login: require(DIR + '/services/accounts/login'),
    checkAccessCode: require(DIR + '/services/accounts/checkAccessCode'),
    changePassword: require(DIR + '/services/accounts/changePassword'),
    changeSettings: require(DIR + '/services/accounts/changeSettings'),
    createPassword: require(DIR + '/services/accounts/createPassword'),
    delete: require(DIR + '/services/accounts/delete'),
}

const Middleware = {
    addAccount: require(DIR + '/middleware/addAccount'),
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
    verifyManager: require(DIR + '/middleware/verifyManager'),
}

const fetch = require(DIR + '/services/fetch');
const Fetch = {
    fetch: fetch.fetch,
    count: fetch.count,
    accounts: (req, res, next) => { req.model = Account; req.supportFilters = true; req.select = '-password -__v -accessCode'; next() },
}

module.exports = (app) => {
    // Get routes
    app.get('/api/accounts/reference', Middleware.verifyAccount, AccountServices.fetchAccount);
    app.get('/api/accounts/count', Middleware.verifyAccount, Middleware.verifyManager, Fetch.accounts, Fetch.count);
    app.get('/api/accounts', Middleware.verifyAccount, Middleware.verifyManager, Fetch.accounts, Fetch.fetch);

    // Post routes
    app.post('/api/accounts', Middleware.addAccount, AccountServices.create);
    app.post('/api/accounts/login', AccountServices.login);
    app.post('/api/accounts/accessCode', AccountServices.checkAccessCode);

    // Put routes
    app.put('/api/accounts/password', Middleware.verifyAccount, AccountServices.changePassword);
    app.put('/api/accounts/settings', Middleware.verifyAccount, AccountServices.changeSettings);
    app.put('/api/accounts/accessCode', AccountServices.createPassword);

    // Delete routes
    app.delete('/api/accounts/:accountId', Middleware.verifyAccount, AccountServices.delete);
}