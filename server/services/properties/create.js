const Property = require(DIR + '/models/properties/property');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['address', 'zipcode', 'lotWidth', 'lotDepth', 'purchaseDate'])
    .then(() => buildProperty(req.body).save())
    .then(property => success(res, {property}, 201))
    .catch(error => Errors.response(res, error));
}

function buildProperty(body){
    var property = new Property();
    property.address = String(body.address);
    property.zipcode = Number(body.zipcode);
    property.lotWidth = Number(body.lotWidth);
    property.lotDepth = Number(body.lotDepth);
    property.purchaseDate = new Date(body.purchaseDate);
    return property;
}