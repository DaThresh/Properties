const Property = require(DIR + '/models/properties/property');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.params, ['propertyId'])
    .then(() => Property.findById(req.params.propertyId))
    .then(property => {
        if(!property) return Promise.reject({notFound: true})
        if(!req.account.organization.equals(property.organization) && !req.account.organization.equals(global.adminOrganization)) return Promise.reject({authorization: true})
        return Property.findByIdAndRemove(req.params.propertyId)
    })
    .then(() => success(res))
    .catch(error => Errors.response(res, error));
}