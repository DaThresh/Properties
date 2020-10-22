const Property = require(DIR + '/models/properties/property');
const fields = require(DIR + '/validations/fields');
const success = require('../success');

module.exports = (req, res) => {
    fields(req.body, ['url'])
    .then(() => Property.findById(req.params.propertyId))
    .then(property => {
        let url = String(req.body.url), type = null;
        if(property.images.public.includes(url)) type = 'public';
        if(property.images.private.includes(url)) type = 'private';
        if(!type) return Promise.reject({notFound: true});
        property.images[type].splice(property.images[type].indexOf(url), 1);
        property.images[type == 'public' ? 'private' : 'public'].push(url);
        return property.save()
    })
    .then(property => success(res, {property}))
    .catch(error => Errors.response(res, error));
}