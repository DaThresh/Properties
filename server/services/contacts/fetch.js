const Contact = require(DIR + '/models/contacts/contact');
const success = require('../success');

module.exports = (req, res) => {
    let offset = req.query.offset ? Number(req.query.offset) : 0;
    let count = req.query.count ? Number(req.query.count) : 10;
    Contact.find({}).skip(offset).limit(count).populate('business')
    .then(contacts => success(res, {contacts}))
    .catch(error => Errors.response(res, error));
}