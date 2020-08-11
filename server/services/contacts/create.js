const Contact = require(DIR + '/models/contacts/contact');
const Business = require(DIR + '/models/contacts/business');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['firstName', 'business'])
    .then(() => Business.findOne({name: String(req.body.business).toLowerCase()}))
    .then(business => {
        if(business == null) return Promise.reject({invalid: 'Invalid business provided'});
        buildContact(req.body, business).save();
    })
    .then(contact => success(res, {contact}, 201))
    .catch(error => Errors.response(res, error));
}

function buildContact(body, business){
    var contact = new Contact();
    contact.business = business;
    contact.firstName = String(body.firstName);
    if(body.lastName) contact.lastName = String(body.lastName);
    if(body.phoneNumber) contact.phoneNumber = Number(body.phoneNumber);
    if(body.title) contact.title = String(body.title);
    return contact;
}