module.exports = (query, next) => {
    if(!query.selected()) query.select('-__v -updatedAt -createdAt');
    next();
}