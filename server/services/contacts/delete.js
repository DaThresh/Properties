const Contact = require(DIR + '/models/contacts/contact');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.params, ['contactId'])
    .then(() => Contact.findByIdAndRemove(req.params.contactId))
    .then(() => success(res))
    .catch(error => Errors.response(res, error));
}