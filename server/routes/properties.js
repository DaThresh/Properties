const PropertyServices = {
    fetch: require(DIR + '/services/properties/fetch'),
    create: require(DIR + '/services/properties/create'),
    delete: require(DIR + '/services/properties/delete'),
}

const Middleware = {
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
}

module.exports = (app) => {
    // Get routes
    app.get('/api/properties', Middleware.verifyAccount, PropertyServices.fetch);

    // Post routes
    app.post('/api/properties', Middleware.verifyAccount, PropertyServices.create);

    // Put routes

    // Delete routes
    app.delete('/api/properties/:propertyId', Middleware.verifyAccount, PropertyServices.delete);
}