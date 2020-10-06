import { getBusinessTypes, getPropertyStatuses, getRole } from './http';

var referenceData = {};

function fetchReferenceData(){
    return new Promise((resolve, reject) => {
        getBusinessTypes()
        .then(response => handleResponse(response, getPropertyStatuses))
        .then(response => handleResponse(response, getRole))
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

function getReferenceData(key){
    return referenceData[key];
}

function updateReferenceData(settings, values){
    settings.forEach((key, index) => {
        if(referenceData.settings[key]) referenceData.settings[key] = values[index];
    })
}

export {
    fetchReferenceData,
    getReferenceData,
    updateReferenceData,
}