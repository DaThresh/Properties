const Contact = require(DIR + '/models/contacts/contact');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.params, ['contactId'])
    .then(() => Contact.findById(req.params.contactId))
    .then(contact => {
        if(!contact) return Promise.reject({notFound: true})
        if(!req.account.organization.equals(contact.organization) && !req.account.organization.equals(global.adminOrganization)) return Promise.reject({authorization: true})
        return Contact.findByIdAndRemove(req.params.contactId);
    })
    .then(() => success(res))
    .catch(error => Errors.response(res, error));
}