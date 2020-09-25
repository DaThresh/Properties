module.exports = (response, body = {}, code = 200) => {
    response.status(code).json({ ...body, ...{message: 'success'} })
}