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
        address, zipcode, lotWidth, lotDepth, purchaseDate},
        addAuth()
    )
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

function postContact(firstName, lastName, email, phoneNumber, title, business, name, businessType){
    return axios.post(hostName + '/api/contacts', {
        firstName, lastName, email, phoneNumber, title, name, businessType,
        business: business === 'add' ? null : business},
        addAuth()
    )
}

function putContact(contactId, firstName, lastName, email, phoneNumber, title, business, name, businessType){
    return axios.put(hostName + '/api/contacts/' + contactId, {
        firstName, lastName, email, phoneNumber, title, name, businessType,
        business: business === 'add' ? null : business},
        addAuth()
    )
}

export {
    postLogin,
    getProperties,
    postProperty,
    getContacts,
    getBusinesses,
    postContact,
    putContact,
    
    // Reference data only below
    getBusinessTypes,
}