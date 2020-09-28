const Organization = require(DIR + '/models/organizations/organization');

const OrganizationServices = {
    create: require(DIR + '/services/organizations/create'),
}

const Middleware = {
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
    verifyAdmin: require(DIR + '/middleware/verifyAdmin'),
}

const fetch = require('../services/fetch');
const Fetch = {
    fetch: fetch.fetch,
    count: fetch.count,
    organizations: (req, res, next) => { req.model = Organization; req.supportFilters = true; next(); }
}

module.exports = (app) => {
    // Get routes
    app.get('/api/organizations', Middleware.verifyAccount, Middleware.verifyAdmin, Fetch.organizations, Fetch.fetch);
    app.get('/api/organizations/count', Middleware.verifyAccount, Middleware.verifyAdmin, Fetch.organizations, Fetch.count);
    
    // Post routes
    app.post('/api/organizations', Middleware.verifyAccount, Middleware.verifyAdmin, OrganizationServices.create);

    // Put routes

    // Delete routes
}