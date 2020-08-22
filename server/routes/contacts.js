const ContactServices = {
    fetch: require(DIR + '/services/contacts/fetch'),
    fetchBusinesses: require(DIR + '/services/contacts/fetchBusinesses'),
    fetchBusinessTypes: require(DIR + '/services/contacts/fetchBusinessTypes'),
    create: require(DIR + '/services/contacts/create'),
    delete: require(DIR + '/services/contacts/delete'),
}

const Middleware = {
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
}

module.exports = (app) => {
    // Get routes
    app.get('/api/contacts', Middleware.verifyAccount, ContactServices.fetch);
    app.get('/api/contacts/businesses', Middleware.verifyAccount, ContactServices.fetchBusinesses);
    app.get('/api/contacts/businessTypes', Middleware.verifyAccount, ContactServices.fetchBusinessTypes);

    // Post routes
    app.post('/api/contacts', Middleware.verifyAccount, ContactServices.create);

    // Put routes

    // Delete routes
    app.delete('/api/contacts/:contactId', Middleware.verifyAccount, ContactServices.delete);
}