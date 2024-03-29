const Property = require(DIR + '/models/properties/property');
const Status = require(DIR + '/models/properties/status');

const PropertyServices = {
    create: require(DIR + '/services/properties/create'),
    uploadPictures: require(DIR + '/services/properties/uploadPictures'),
    updateStatus: require(DIR + '/services/properties/updateStatus'),
    reorderPictures: require(DIR + '/services/properties/reorderPictures'),
    movePicture: require(DIR + '/services/properties/movePicture'),
    delete: require(DIR + '/services/properties/delete'),
    deletePictures: require(DIR + '/services/properties/deletePictures'),
}

const Middleware = {
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
}

const fetch = require(DIR + '/services/fetch');
const Fetch = {
    fetch: fetch.fetch,
    count: fetch.count,
    fetchId: fetch.fetchId,
    properties: (req, res, next) => { req.model = Property; req.supportFilters = true; next() },
    statuses: (req, res, next) => { req.model = Status; next() },
}

module.exports = (app) => {
    // Get routes
    app.get('/api/properties', Middleware.verifyAccount, Fetch.properties, Fetch.fetch);
    app.get('/api/properties/count', Middleware.verifyAccount, Fetch.properties, Fetch.count);
    app.get('/api/properties/statuses', Middleware.verifyAccount, Fetch.statuses, Fetch.fetch);
    app.get('/api/properties/:propertyId', Middleware.verifyAccount, Fetch.properties, Fetch.fetchId);

    // Post routes
    app.post('/api/properties', Middleware.verifyAccount, PropertyServices.create);
    app.post('/api/properties/:propertyId/uploadPictures', Middleware.verifyAccount, PropertyServices.uploadPictures);

    // Put routes
    app.put('/api/properties/:propertyId/status', Middleware.verifyAccount, PropertyServices.updateStatus);
    app.put('/api/properties/:propertyId/pictures', Middleware.verifyAccount, PropertyServices.reorderPictures);
    app.put('/api/properties/:propertyId/picture', Middleware.verifyAccount, PropertyServices.movePicture);

    // Delete routes
    app.delete('/api/properties/:propertyId', Middleware.verifyAccount, PropertyServices.delete);
    app.delete('/api/properties/:propertyId/pictures', Middleware.verifyAccount, PropertyServices.deletePictures);
}