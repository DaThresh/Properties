const PropertyServices = {
    create: require(DIR + '/services/properties/create'),
    fetch: require(DIR + '/services/properties/fetch'),
}

const Middleware = {
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
}

module.exports = (app) => {
    app.get('/api/properties', Middleware.verifyAccount, PropertyServices.fetch);

    app.post('/api/properties', Middleware.verifyAccount, PropertyServices.create);
}