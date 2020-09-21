const PropertyServices = {
    fetch: require(DIR + '/services/properties/fetch'),
    fetchStatuses: require(DIR + '/services/properties/fetchStatuses'),
    create: require(DIR + '/services/properties/create'),
    updateStatus: require(DIR + '/services/properties/updateStatus'),
    delete: require(DIR + '/services/properties/delete'),
}

const Middleware = {
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
}

module.exports = (app) => {
    // Get routes
    app.get('/api/properties', Middleware.verifyAccount, PropertyServices.fetch);
    app.get('/api/properties/statuses', Middleware.verifyAccount, PropertyServices.fetchStatuses);

    // Post routes
    app.post('/api/properties', Middleware.verifyAccount, PropertyServices.create);

    // Put routes
    app.put('/api/properties/:propertyId/status', Middleware.verifyAccount, PropertyServices.updateStatus);

    // Delete routes
    app.delete('/api/properties/:propertyId', Middleware.verifyAccount, PropertyServices.delete);
}