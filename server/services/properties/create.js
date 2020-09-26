const Property = require(DIR + '/models/properties/property');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['address', 'zipcode', 'purchaseDate'])
    .then(() => buildProperty(req.body).save())
    .then(property => success(res, {property}, 201))
    .catch(error => Errors.response(res, error));
}

function buildProperty(body){
    var property = new Property();
    property.address = String(body.address);
    property.zipcode = String(body.zipcode);
    property.purchaseDate = new Date(body.purchaseDate);
    property.organization = req.account.organization;
    if(body.lotWidth) property.lotWidth = Number(body.lotWidth);
    if(body.lotDepth) property.lotDepth = Number(body.lotDepth);
    return property;
}