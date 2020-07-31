const PropertyServices = {
    create: require(DIR + '/services/properties/create'),
}

const Middleware = {
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
}

module.exports = (app) => {
    app.post('/api/properties', Middleware.verifyAccount, PropertyServices.create);
}