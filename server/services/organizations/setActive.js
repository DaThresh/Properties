const Organization = require(DIR + '/models/organizations/organization');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['active'])
    .then(() => Organization.findById(req.params.organizationId))
    .then(organization => {
        if(!organization) return Promise.reject({notFound: true});
        organization.active = Boolean(req.body.active);
        return organization.save()
    })
    .then(organization => success(res, {organization}))
    .catch(error => Errors.response(res, error));
}