const Property = require(DIR + '/models/properties/property');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['type', 'order'])
    .then(() => Property.findById(req.params.propertyId))
    .then(property => {
        let type = String(req.body.type);
        if(!property) return Promise.reject({notFound: true})
        if(!property.organization.equals(req.account.organization) && !req.account.organization.equals(global.adminOrganizaiton)) return Promise.reject({notFound: true});
        if(!['public','private'].includes(req.body.type)) return Promise.reject({invalid: 'Invalid type passed'});
        if(!property.images[type].every(url => req.body.order.includes(url))) return Promise.reject({invalid: 'Must include all of the current URLs'});
        property.images[type] = req.body.order;
        return property.save()
    })
    .then(property => success(res, {property}))
    .catch(error => Errors.response(res, error));
}