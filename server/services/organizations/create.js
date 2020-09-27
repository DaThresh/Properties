const Organization = require(DIR + '/models/organizations/organization');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['name'])
    .then(() => Organization.create({name: String(req.body.name)}))
    .then(organization => success(res, {organization}, 201))
    .catch(error => Errors.response(res, error));
}