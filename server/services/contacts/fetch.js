const Contact = require(DIR + '/models/contacts/contact');
const success = require('../success');

module.exports = (req, res) => {
    let offset = req.query.offset ? Number(req.query.offset) : 0;
    let count = req.query.count ? Number(req.query.count) : 10;
    var total = 0;
    Contact.countDocuments()
    .then(data => {
        total = data;
        return Contact.find({}).skip(offset).limit(count).populate('business')
    })
    .then(contacts => success(res, {contacts, total}))
    .catch(error => Errors.response(res, error));
}