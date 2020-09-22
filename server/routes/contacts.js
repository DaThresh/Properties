const Contact = require(DIR + '/models/contacts/contact');
const Business = require(DIR + '/models/contacts/business');
const BusinessType = require(DIR + '/models/contacts/businessType');

const ContactServices = {
    create: require(DIR + '/services/contacts/create'),
    update: require(DIR + '/services/contacts/update'),
    updateBusiness: require(DIR + '/services/contacts/updateBusiness'),
    delete: require(DIR + '/services/contacts/delete'),
}

const Middleware = {
    verifyAccount: require(DIR + '/middleware/verifyAccount'),
}

const fetch = require(DIR + '/services/fetch');
const Fetch = {
    fetch: fetch.fetch,
    count: fetch.count,
    contacts: (req, res, next) => { req.model = Contact; req.supportFilters = true; next() },
    businesses: (req, res, next) => { req.model = Business; req.supportFilters = true; next() },
    businessTypes: (req, res, next) => { req.model = BusinessType; next() },
}

module.exports = (app) => {
    // Get routes
    app.get('/api/contacts', Middleware.verifyAccount, Fetch.contacts, Fetch.fetch);
    app.get('/api/contacts/count', Middleware.verifyAccount, Fetch.contacts, Fetch.count);
    app.get('/api/contacts/businesses', Middleware.verifyAccount, Fetch.businesses, Fetch.fetch);
    app.get('/api/contacts/businessTypes', Middleware.verifyAccount, Fetch.businessTypes, Fetch.fetch);

    // Post routes
    app.post('/api/contacts', Middleware.verifyAccount, ContactServices.create);

    // Put routes
    app.put('/api/contacts/:contactId', Middleware.verifyAccount, ContactServices.update);
    app.put('/api/contacts/businesses/:businessId', Middleware.verifyAccount, ContactServices.updateBusiness);

    // Delete routes
    app.delete('/api/contacts/:contactId', Middleware.verifyAccount, ContactServices.delete);
}