const Organization = require(DIR + '/models/organizations/organization');
const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');
const success = require('../success');


module.exports = (req, res) => {
    const devDirectory = ['uploads', 'organizations', req.account.organization];
    const saveLocation = '/' + devDirectory.join('/') + '/profilePicture.png';
    const fullSaveLocation = path.join(DIR + '/../public' + saveLocation);
    var isValid = false;
    var busboy = new Busboy({ headers: req.headers, limits: { files: 1 } });
    busboy.on('file', (fieldName, file, _, __, mimeType) => {
        if(fieldName !== 'profilePicture') return file.resume();
        if(!['image/png', 'image/jpg', 'image/jpeg'].includes(mimeType)) return file.resume();
        isValid = true;
        devDirectory.forEach((_, index) => {
            var arr = [];
            while(arr.length <= index) arr.push(devDirectory[arr.length]);
            let directory = path.join(DIR + '/../public/' + arr.join('/'));
            if(!fs.existsSync(directory)) fs.mkdirSync(directory);
        })
        file.pipe(fs.createWriteStream(fullSaveLocation));
    })
    busboy.on('finish', () => {
        if(!isValid) return Errors.response(res, {invalid: 'Invalid file type'});
        Organization.findById(req.account.organization)
        .then(organization => {
            organization.images.profilePicture = saveLocation;
            return organization.save()
        })
        .then(organization => success(res, {profilePictureUrl: organization.images.profilePicture}))
        .catch(error => Errors.response(res, error));
    })
    req.pipe(busboy);
}