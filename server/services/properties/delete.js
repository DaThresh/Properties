const Property = require(DIR + '/models/property');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.params, ['propertyId'])
    .then(() => Property.findByIdAndRemove(req.params.propertyId))
    .then(() => success(res))
    .catch(error => Errors.response(res, error));
}