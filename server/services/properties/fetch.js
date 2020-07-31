const Property = require(DIR + '/models/property');
const success = require('../success');

module.exports = (req, res) => {
    let offset = req.params.offset ? Number(req.params.offset) : 0;
    let count = req.params.count ? Number(req.params.count) : 10;
    Property.find({}).skip(offset).limit(count)
    .then(properties => success(res, {properties}))
    .catch(error => Errors.response(res, error));
}