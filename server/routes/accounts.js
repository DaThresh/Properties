const Account = require("../models/account");

const AccountServices = {
    create: require(DIR + '/services/accounts/create'),
}

module.exports = (app) => {
    app.post('/api/accounts', AccountServices.create);
}