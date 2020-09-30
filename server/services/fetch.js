const Organization = require(DIR + '/models/organizations/organization');
const BusinessType = require(DIR + '/models/contacts/businessType');
const Status = require(DIR + '/models/properties/status');
const success = require('./success');

const skipOrganizationModels = [Organization, BusinessType, Status];

module.exports = {
    fetch: (req, res) => {
        var {model, body, account, supportFilters = false, select = '', populate = ''} = req;
        var name = model.collection.name;
        var filters = req.query.filters ? JSON.parse(req.query.filters) : {};
        if(body.filters) filters = body.filters;
        if(!supportFilters) filters = {};
        if(!skipOrganizationModels.includes(model)) filters = {...filters, ...{organization: account.organization}}
        let offset = req.query.offset ? Number(req.query.offset) : 0;
        let count = req.query.count ? Number(req.query.count) : 10;
        model.find(filters).skip(offset).limit(count).select(select).populate(populate)
        .then(data => success(res, {[name]: data}))
        .catch(error => Errors.response(res, error));
    },
    fetchId: (req, res) => {
        var {model, account, select = ''} = req;
        var name = Format.lowercase(model.modelName);
        model.findById(Object.values(req.params)[0]).select(select)
        .then(data => {
            if(!data) return Promise.reject({notFound: true})
            if(model !== Organization && data.organization.equals(account.organization)) return data;
            if(account.organization.equals(global.adminOrganization)) return data;
            return Promise.reject({notFound: true})
        })
        .then(data => success(res, {[name]: data}))
        .catch(error => Errors.response(res, error));
    },
    count: (req, res) => {
        var {model, body, account, supportFilters = false} = req;
        var filters = req.query.filters ? JSON.parse(req.query.filters) : {};
        if(body.filters) filters = body.filters;
        if(!supportFilters) filters = {};
        if(model !== Organization) filters = {...filters, ...{organization: account.organization}}
        model.countDocuments(filters)
        .then(count => success(res, {count}))
        .catch(error => Errors.response(res, error));
    }
}