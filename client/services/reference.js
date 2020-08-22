import { getBusinessTypes } from './http';

import { apiError } from '../utilities/apiError';

var referenceData = {};

function fetchReferenceData(){
    getBusinessTypes()
    .then(response => handleResponse(response))
    .catch(error => apiError(error));
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

function getReferenceData(key){
    return referenceData[key];
}

export {
    fetchReferenceData,
    getReferenceData,
}