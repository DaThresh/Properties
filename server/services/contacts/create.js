const Contact = require(DIR + '/models/contacts/contact');
const Business = require(DIR + '/models/contacts/business');
const BusinessType = require(DIR + '/models/contacts/businessType');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['firstName'])
    .then(() => fields(req.body, (req.body.business ? ['business'] : ['name', 'businessType'])))
    .then(() => {
        if(req.body.business) return Business.findOne({name: { $regex: new RegExp('^' + String(req.body.business) + '$', 'i') }})
        else return BusinessType.findOne({name: { $regex: new RegExp('^' + String(req.body.businessType) + '$', 'i') }})
    })
    .then(object => {
        if(object == null) return Promise.reject(rejection(req.body));
        return buildContact(req, object)
    })
    .then(contact => contact.save())
    .then(contact => success(res, {contact}, 201))
    .catch(error => Errors.response(res, error));
}

// This function attaches an existing business to a new contact or creates a new business and then attaches it to the new contact.
function buildContact(request, object){
    var { body, account } = request;
    return new Promise((resolve, reject) => {
        var contact = new Contact();
        contact.firstName = String(body.firstName);
        contact.organization = account.organization;
        if(body.lastName) contact.lastName = String(body.lastName);
        if(body.phoneNumber) contact.phoneNumber = Number(body.phoneNumber) || null;
        if(body.title) contact.title = String(body.title);
        if(body.email) contact.email = String(body.email);
        // Check to see if the passed object is a businessType or a Business
        if(object instanceof Business){
            contact.business = object;
            resolve(contact);
        }
        else {
            var business = new Business();
            business.name = String(body.name);
            business.type = String(body.businessType);
            business.organization = account.organization;
            business.save()
            .then(business => {
                contact.business = business;
                resolve(contact);
            })
            .catch(error => reject(error));
        }
    });
}

function rejection(body){
    return {invalid: (body.business ? 'Invalid business name' : 'Invalid business type name')}
}