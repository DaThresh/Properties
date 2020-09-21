global.mongoose = require('mongoose');
const BusinessType = require(DIR + '/models/contacts/businessType');
const Status = require(DIR + '/models/properties/status');

let mongostring;
let name = DATABASE['NAME'];
let host = DATABASE['HOST'];
let port = DATABASE['PORT'];
let username = DATABASE['USERNAME'];
let password = DATABASE['PASSWORD'];
let protocal = DATABASE['SRV'] ? 'mongodb+srv://' : 'mongodb://';
let options = DATABASE['OPTIONS'];

username ? 
    mongostring = protocal + username + ':' + password + '@' + host :
    mongostring = protocal + host;

if(!DATABASE['SRV']){
    mongostring += ':' + port;
}
mongostring += '/' + name;

let optKeys = Object.keys(options);
if(optKeys.length > 0){
    let opts = [];
    optKeys.forEach((key) => {
        opts.push(
            key + '=' + String(options[key])
        );
    });
    mongostring += '?' + opts.join('&');
}

mongoose.connect(mongostring, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            Logger.info('Connected to MongoDB');
            insertDefaults();
        })
        .catch(err => {
            Errors.fatal(err, 'Error connecting to mongoose database');
        });

function insertDefaults(){
    BusinessType.insertDefaults()
    .then(() => Status.insertDefaults())
    .catch(error => Errors.error(error, 'Failed to insert all of the default reference data'));
}