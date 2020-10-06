const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['setting', 'value'])
    .then(() => {
        if(req.account.settings === undefined) req.account.settings = {};
        req.account.settings[String(req.body.setting)] = req.body.value;
        return req.account.save()
    })
    .then(() => success(res))
    .catch(error => Errors.response(res, error));
}