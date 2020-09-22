const Property = require(DIR + '/models/properties/property');
const success = require('../success');

module.exports = (req, res) => {
    let offset = req.query.offset ? Number(req.query.offset) : 0;
    let count = req.query.count ? Number(req.query.count) : 10;
    var total;
    Property.countDocuments()
    .then(data => {
        total = data;
        return Property.find({}).skip(offset).limit(count);
    })
    .then(properties => success(res, {properties, total}))
    .catch(error => Errors.response(res, error));
}