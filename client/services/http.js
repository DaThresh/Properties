import axios from 'axios';

import { getToken } from './account';

const hostName = 'http://' + window.location.host;

function addAuth(){
    return {headers: {
        Authorization: getToken(),
    }}
}

function postLogin(email, password, remember){
    return axios.post(hostName + '/api/accounts/login', {email, password, remember});
}

function getProperties(offset, count){
    return axios.get(hostName + '/api/properties?offset=' + offset + '&count=' + count, addAuth());
}

function postProperty(address, zipcode, lotWidth, lotDepth, purchaseDate){
    return axios.post(hostName = '/api/properties', {
        address, zipcode, lotWidth, lotDepth, purchaseDate,
        headers: { Authorization: getToken() },
    })
}

function getContacts(offset, count){
    return axios.get(hostName + '/api/contacts?offset=' + offset + '&count=' + count, addAuth());
}

function getBusinesses(){
    return axios.get(hostName + '/api/contacts/businesses', addAuth());
}

function getBusinessTypes(){
    return axios.get(hostName + '/api/contacts/businessTypes', addAuth());
}

export {
    postLogin,
    getProperties,
    postProperty,
    getContacts,
    getBusinesses,
    
    // Reference data only below
    getBusinessTypes,
}