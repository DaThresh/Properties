const Contact = require(DIR + '/models/contacts/contact');
const Business = require(DIR + '/models/contacts/business');
const BusinessType = require(DIR + '/models/contacts/businessType');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    var contact;
    fields(req.body, ['firstName'])
    .then(() => fields(req.body, req.body.business ? ['business'] : ['name', 'businessType']))
    .then(() => Contact.findById(req.params.contactId))
    .then(object => {
        if(object == null) return Promise.reject({invalid: 'Invalid contact ID'});
        if(!req.account.organization.equals(object.organization) && !req.account.organization.equals(global.adminOrganization)) return Promise.reject({authorization: true});
        contact = object;
        if(req.body.business) return Business.findOne({name: { $regex: new RegExp('^' + String(req.body.business) + '$', 'i') }})
        else return BusinessType.findOne({name: { $regex: new RegExp('^' + String(req.body.businessType) + '$', 'i') }})
    })
    .then(object => {
        if(object == null) return Promise.reject(rejection(req.body));
        return updateContact(contact, req.body, object)
    })
    .then(contact => contact.save())
    .then(contact => success(res, {contact}))
    .catch(error => Errors.response(res, error));
}

function updateContact(contact, body, object){
    return new Promise((resolve, reject) => {
        contact.firstName = String(body.firstName);
        if(body.lastName != null) contact.lastName = String(body.lastName);
        if(body.phoneNumber != null) contact.phoneNumber = Number(body.phoneNumber) || null;
        if(body.title != null) contact.title = String(body.title);
        if(body.email != null) contact.email = String(body.email);
        // Check to see if the passed object is a businessType or a Business
        if(object instanceof Business){
            contact.business = object;
            resolve(contact);
        }
        else {
            var business = new Business();
            business.name = String(body.name);
            business.type = String(body.businessType);
            business.save()
            .then(business => {
                contact.business = business;
                resolve(contact);
            })
            .catch(error => reject(error));
        }
    })
}

function rejection(body){
    return {invalid: (body.business ? 'Invalid business name' : 'Invalid business type name')}
}