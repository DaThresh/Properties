const Account = require(DIR + '/models/organizations/account');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['email', 'firstName', 'lastName'])
    .then(() => Account.countDocuments())
    .then(count => {
        let first = false;
        if(count === 0) first = true;
        else if(!req.account || req.account.role < global.managerRole) return Promise.reject({authorization: true})
        return buildAccount(req, first).save();
    })
    .then(() => success(res, {}, 201))
    .catch(error => Errors.response(res, error));
}

// First account will always have role 900 (root account)
function buildAccount(request, first = false){
    var { body } = request;
    var account = new Account();
    account.email = String(body.email);
    account.organization = first ? global.adminOrganization : request.account.organization;
    account.firstName = String(body.firstName);
    account.lastName = String(body.lastName);
    account.role = first ? 9 : 1;
    if(!first) account.accessCode = Account.generateAccessCode();
    if(!first && request.account.organization.equals(global.adminOrganization) && body.organization) account.organization = body.organization;
    return account;
}