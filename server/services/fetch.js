const success = require('./success');

module.exports = {
    fetch: (req, res) => {
        var {model, select = '', supportFilters = false} = req;
        var name = model.collection.name;
        var filters = req.query.filters ? JSON.parse(req.query.filters) : {};
        let offset = req.query.offset ? Number(req.query.offset) : 0;
        let count = req.query.count ? Number(req.query.count) : 10;
        model.find(supportFilters ? filters : {}).skip(offset).limit(count).select(select)
        .then(data => success(res, {[name]: data}))
        .catch(error => Errors.response(res, error));
    },
    fetchId: (req, res) => {
        var {model, select = ''} = req;
        var name = Format.lowercase(model.modelName);
        model.findById(Object.values(req.params)[0]).select(select)
        .then(data => success(res, {[name]: data}))
        .catch(error => Errors.response(res, error));
    },
    count: (req, res) => {
        var {model, supportFilters = false} = req;
        var filters = req.query.filters ? JSON.parse(req.query.filters) : {};
        model.countDocuments(supportFilters ? filters : {})
        .then(count => success(res, {count}))
        .catch(error => Errors.response(res, error));
    }
}