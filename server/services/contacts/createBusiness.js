const Business = require(DIR + '/models/contacts/business');
const BusinessType = require(DIR + '/models/contacts/businessType');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['name', 'businessType'])
    .then(() => BusinessType.findOne({name: String(req.body.businessType)}))
    .then(businessType => {
        if(businessType == null) return Promise.reject({invalid: 'Invalid business type provided'});
        buildBusiness(req.body, businessType).save();
    })
    .then(business => success(res, {business}, 201))
    .catch(error => Errors.response(res, error));
}

function buildBusiness(body, businessType){
    var business = new Business();
    business.type = businessType.name;
    business.name = String(body.name);
    return business;
}