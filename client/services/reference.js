import { getBusinessTypes, getPropertyStatuses } from './http';

var referenceData = {};

function fetchReferenceData(){
    return new Promise((resolve, reject) => {
        getBusinessTypes()
        .then(response => handleResponse(response, getPropertyStatuses))
        .then(response => handleResponse(response))
        .then(() => resolve())
        .catch(error => reject(error));
    })
}

function handleResponse(response, chain){
    if(response.status === 200){
        let data = response.data;
        let keys = Object.keys(data);
        keys.forEach(key => {
            if(key !== 'message') referenceData[key] = data[key];
        })
    }
    else Promise.reject({invalid: 'Invalid response from ref data handler'});
    // Pass in chained reference data getters
    if(chain) return chain();
}

function getReferenceData(key, voidReturnType = 'null'){
    if(voidReturnType === 'array') return referenceData[key] ? referenceData[key] : [];
    if(voidReturnType === 'string') return referenceData[key] ? referenceData[key] : '';
    return referenceData[key];
}

export {
    fetchReferenceData,
    getReferenceData,
}