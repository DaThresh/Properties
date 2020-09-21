const Property = require(DIR + '/models/properties/property');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['status'])
    .then(() => Property.findByIdAndUpdate(req.params.propertyId, {status: String(req.body.status)}))
    .then(() => success(res))
    .catch(error => Errors.response(res, error));
}