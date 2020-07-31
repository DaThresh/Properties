const Account = require(DIR + '/models/account');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['email', 'password'])
    .then(() => Account.countDocuments())
    .then(count => {
        if(count === 0){

        } else {

        }
        success(res, {say: 'temporary holding spot'})
    }).catch(error => Errors.response(res, error));
}