const OrganizationServices = {
    create: require(DIR + '/models/organizations/create'),
}

const Middleware = {
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
    verifyAdmin: require(DIR + '/middleware/verifyAdmin'),
}

module.exports = (app) => {
    // Get routes
    
    // Post routes
    app.post('/api/organizations', Middleware.verifyAccount, Middleware.verifyAdmin, OrganizationServices.create);

    // Put routes

    // Delete routes
}