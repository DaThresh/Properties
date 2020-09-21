const Status = require(DIR + '/models/properties/status');
const success = require('../success');

module.exports = (req, res) => {
    Status.find({})
    .then(statuses => success(res, {statuses}))
    .catch(error => Errors.response(res, error));
}