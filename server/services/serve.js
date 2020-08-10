const path = require('path');

module.exports = (app) => {
    app.get('*', serveApplication);
}

function serveApplication(req, res){
    res.sendFile(path.resolve(DIR + '/../public/index.html'));
}