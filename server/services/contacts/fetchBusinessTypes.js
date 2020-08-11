const BusinessType = require(DIR + '/models/contacts/businessType');
const success = require('../success');

module.exports = (req, res) => {
    BusinessType.find({})
    .then(businessTypes => success(res, {businessTypes}))
    .catch(error => Errors.response(res, error));
}