const Property = require(DIR + '/models/properties/property');
const path = require('path');
const fs = require('fs');
const success = require('../success');

module.exports = (req, res) => {
    Property.findById(req.params.propertyId)
    .then(property => {
        var type = String(req.body.type || req.query.type), urls = req.body.urls || req.query.urls;
        if(!property) return Promise.reject({notFound: true})
        if(!property.organization.equals(req.account.organization) && !req.account.organization.equals(global.adminOrganizaiton)) return Promise.reject({notFound: true});
        if(!['public','private'].includes(type)) return Promise.reject({invalid: 'Invalid type passed'});
        if(!urls.every(url => property.images[type].includes(url))) return Promise.reject({invalid: 'Cannot delete not present URLs'});
        if(FILES.LOCAL){
            const pre = DIR + '/../public';
            urls.forEach(url => {
                if(!fs.existsSync(path.join(pre + url))) return;
                fs.unlinkSync(path.join(pre + url));
            })
        }
        urls.forEach(url => property.images[type].splice(property.images[type].indexOf(url), 1));
        return property.save()
    })
    .then(property => success(res, {property}))
    .catch(error => Errors.response(res, error));
}