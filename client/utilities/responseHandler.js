function responseHandler(httpMethod, expectedStatus, dataKey = null, ...args){
    return new Promise((resolve, reject) => {
        httpMethod(...args)
        .then(response => {
            if(response.status === expectedStatus) resolve(response?.data[dataKey] ?? response.data)
            else reject(response);
        })
        .catch(error => reject(error));
    })
}

export default responseHandler;