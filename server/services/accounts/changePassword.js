const fields = require(DIR + '/validations/fields');
const bcrypt = require('bcrypt');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['password', 'newPassword', 'confirmNewPassword'])
    .then(() => {
        if(String(req.body.newPassword) != String(req.body.confirmNewPassword)) return Promise.reject({confirm: 'Passwords do not match'});
        if(String(req.body.newPassword).length < 6) return Promise.reject({invalid: 'Password must be at least 6 characters'});
        if(!bcrypt.compareSync(String(req.body.password), req.account.password)) return Promise.reject({invalid: 'Incorrect old password'});
        return req.account.updateOne({password: bcrypt.hashSync(String(req.body.newPassword), 10)});
    })
    .then(() => success(res))
    .catch(error => Errors.response(res, error));
}