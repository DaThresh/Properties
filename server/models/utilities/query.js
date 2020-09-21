// Below should be added to all models
var defaultQuery = (query, next) => {
    if(!query.selected()) query.select('-__v -updatedAt -createdAt');
    next();
}

// Below doesn't need to be added to reference data
var defaultUpdate = (query, next) => {
    let options = query.getOptions();
    if(typeof options.runValidators === 'undefined') options.runValidators = true;
    if(typeof options.context === 'undefined') options.context = 'query';
    query.setOptions(options);
    next();
}

module.exports = {
    defaultQuery,
    defaultUpdate,
}