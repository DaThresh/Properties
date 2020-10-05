const Account = require(DIR + '/models/organizations/account');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['email', 'firstName', 'lastName'])
    .then(() => Account.estimatedDocumentCount())
    .then(count => {
        if(count === 0) return true;
        else if(!req.account || req.account.role < global.managerRole) return Promise.reject({authorization: true})
        let isAdmin = req.account.organization.equals(global.adminOrganization);
        let organizationId = isAdmin ? (req.body.organization ? req.body.organization : req.account.organization) : req.account.organization;
        return Account.countDocuments({organization: organizationId});
    })
    .then(data => {
        if(typeof data === 'boolean') return buildAccount(req, true, true);
        else return buildAccount(req, data === 0, false);
    })
    .then(account => success(res, {accessCode: account.accessCode}, 201))
    .catch(error => Errors.response(res, error));
}

// First account will always have role 9 (Organizer account)
function buildAccount(request, first = false, root = false){
    if(!root) var isAdmin = request.account.organization.equals(global.adminOrganization);
    if(!root) var organization = isAdmin ? (request.body.organization ? request.body.organization : request.account.organization) : request.account.organization;
    var { body } = request;
    var account = new Account();
    account.email = String(body.email);
    account.organization = root ? global.adminOrganization : organization;
    account.firstName = String(body.firstName);
    account.lastName = String(body.lastName);
    account.role = first ? 9 : 1;
    account.accessCode = Account.generateAccessCode();
    return account.save();
}