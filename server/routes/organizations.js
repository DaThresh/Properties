const Organization = require(DIR + '/models/organizations/organization');

const OrganizationServices = {
    create: require(DIR + '/services/organizations/create'),
    uploadProfilePicture: require(DIR + '/services/organizations/uploadProfilePicture'),
    setActive: require(DIR + '/services/organizations/setActive'),
}

const Middleware = {
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
    verifyManager: require(DIR + '/middleware/verifyManager'),
    verifyAdmin: require(DIR + '/middleware/verifyAdmin'),
}

const fetch = require('../services/fetch');
const Fetch = {
    fetch: fetch.fetch,
    count: fetch.count,
    fetchId: fetch.fetchId,
    organizations: (req, res, next) => { req.model = Organization; req.supportFilters = true; next(); }
}

module.exports = (app) => {
    // Get routes
    app.get('/api/organizations', Middleware.verifyAccount, Middleware.verifyAdmin, Fetch.organizations, Fetch.fetch);
    app.get('/api/organizations/count', Middleware.verifyAccount, Middleware.verifyAdmin, Fetch.organizations, Fetch.count);
    app.get('/api/organizations/:organizationId', Middleware.verifyAccount, Middleware.verifyAdmin, Fetch.organizations, Fetch.fetchId);
    
    // Post routes
    app.post('/api/organizations', Middleware.verifyAccount, Middleware.verifyAdmin, OrganizationServices.create);
    app.post('/api/organizations/:organizationId/picture', Middleware.verifyAccount, Middleware.verifyManager, OrganizationServices.uploadProfilePicture);

    // Put routes
    app.put('/api/organizations/:organizationId/active', Middleware.verifyAccount, Middleware.verifyAdmin, OrganizationServices.setActive);

    // Delete routes
}