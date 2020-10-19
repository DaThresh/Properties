const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['settings', 'values'])
    .then(() => {
        if(!(req.body.settings instanceof Array) || !(req.body.values instanceof Array)) return Promise.reject({invalid: 'Invalid data types passed'})
        req.body.settings.forEach((key, index) => {
            req.account.settings[String(key)] = req.body.values[index];
        })
        return req.account.save()
    })
    .then(() => success(res))
    .catch(error => Errors.response(res, error));
}