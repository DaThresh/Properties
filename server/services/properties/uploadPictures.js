const Property = require(DIR + '/models/properties/property');
const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');
const success = require('../success');

module.exports = (req, res) => {
    Property.findById(req.params.propertyId)
    .then(property => {
        if(!property) return Promise.reject({notFound: true});
        if(!property.organization.equals(req.account.organization) && !req.account.organization.equals(global.adminOrganization)) return Promise.reject({notFound: true});
        var completed = { public: [], private: [] };
        var devDirectory = ['uploads', 'properties', property.id];
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', (fieldName, file, _, __, mimeType) => {
            if(!['private', 'public'].includes(fieldName)) return file.resume();
            if(!CONSTANTS.mimeTypes.images.includes(mimeType)) return file.resume();
            devDirectory.forEach((_, index) => {
                var arr = [];
                while(arr.length <= index) arr.push(devDirectory[arr.length]);
                let directory = path.join(DIR + '/../public/' + arr.join('/'));
                if(!fs.existsSync(directory)) fs.mkdirSync(directory);
            });
            var fileExtension = '.' + (mimeType === 'image/png' ? 'png' : 'jpg');
            var fileName = new Date().getTime();
            while(fs.existsSync(path.join(DIR + '/../public/' + devDirectory.join('/') + '/' + fileName + fileExtension))) fileName++;
            var fullSaveLocation = path.join(DIR + '/../public/' + devDirectory.join('/') + '/' + fileName + fileExtension);
            completed[fieldName].push('/' + devDirectory.join('/') + '/' + fileName + fileExtension);
            file.pipe(fs.createWriteStream(fullSaveLocation));
        });
        busboy.on('finish', () => {
            property.images.public = [...property.images.public, ...completed.public];
            property.images.private = [...property.images.private, ...completed.private];
            property.save()
            .then(property => success(res, {property}))
            .catch(error => Errors.response(res, error));
        })
        req.pipe(busboy);
    })
    .catch(error => Errors.response(res, error));
}