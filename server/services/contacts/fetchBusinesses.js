const Business = require(DIR + '/models/contacts/business');
const success = require('../success');

module.exports = (req, res) => {
    Business.find({})
    .then(businesses => success(res, {businesses}))
    .catch(error => Errors.response(res, error));
}