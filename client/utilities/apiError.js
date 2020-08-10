function apiError(error, codeMethods = {}){
    let response = error.response;
    if(typeof response === 'undefined') return;
    if(codeMethods[response.status]){
        codeMethods[response.status](error);
    } else {
        console.error(error);
    }
}

export {
    apiError,
}