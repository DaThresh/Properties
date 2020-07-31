module.exports = (response, body = {}, code = 200) => {
    response.status(code).json(Object.assign({
        message: 'success',
    }, body));
}