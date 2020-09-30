const Business = require(DIR + '/models/contacts/business');
const BusinessType = require(DIR + '/models/contacts/businessType');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['name', 'type'])
    .then(() => BusinessType.findOne({name: String(req.body.type)}))
    .then(businessType => {
        if(businessType == null) return Promise.reject({invalid: 'Business Type does not exit'});
        return Business.findById(req.params.businessId)
    })
    .then(business => {
        if(business == null) return Promise.reject({invalid: 'Business does not exist'});
        if(!req.account.organization.equals(business.organization) && !req.account.organization.equals(global.adminOrganization)) return Promise.reject({authorization: true});
        return updateBusiness(business, req.body).save()
    })
    .then(business => success(res, {business}))
    .catch(error => Errors.response(res, error));
}

function updateBusiness(business, body){
    business.name = String(body.name);
    business.type = String(body.type);
    return business;
}