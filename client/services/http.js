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

function getRole(){
    return axios.get(hostName + '/api/accounts/role', addAuth());
}

function getProperties(offset, count, filters){
    return axios.get(hostName + '/api/properties?offset=' + offset + '&count=' + count, { params: {...filters}, ...addAuth() });
}

function getPropertiesCount(filters){
    return axios.get(hostName + '/api/properties/count', { params: {...filters}, ...addAuth() });
}

function postProperty(address, zipcode, lotWidth, lotDepth, purchaseDate){
    return axios.post(hostName + '/api/properties',
        {address, zipcode, lotWidth, lotDepth, purchaseDate},
        addAuth()
    )
}

function putPropertyStatus(propertyId, status){
    return axios.put(hostName + '/api/properties/' + propertyId + '/status',
        {status},
        addAuth()
    )
}

function getPropertyStatuses(){
    return axios.get(hostName + '/api/properties/statuses', addAuth());
}

function getContacts(offset, count, filters){
    return axios.get(hostName + '/api/contacts?offset=' + offset + '&count=' + count, { params: {...filters}, ...addAuth() });
}

function getContactsCount(filters){
    return axios.get(hostName + '/api/contacts/count', { params: {...filters}, ...addAuth() });
}

function getBusinesses(filters){
    return axios.get(hostName + '/api/contacts/businesses', { params: {...filters}, ...addAuth() });
}

function getBusinessTypes(){
    return axios.get(hostName + '/api/contacts/businessTypes', addAuth());
}

function postContact(firstName, lastName, email, phoneNumber, title, business, name, businessType){
    return axios.post(hostName + '/api/contacts',
        {firstName, lastName, email, phoneNumber, title, name, businessType,
        business: business === 'add' ? null : business},
        addAuth()
    )
}

function putContact(contactId, firstName, lastName, email, phoneNumber, title, business, name, businessType){
    return axios.put(hostName + '/api/contacts/' + contactId,
        {firstName, lastName, email, phoneNumber, title, name, businessType,
        business: business === 'add' ? null : business},
        addAuth()
    )
}

function putBusiness(businessId, name, type){
    return axios.put(hostName + '/api/contacts/businesses/' + businessId,
        {name, type},
        addAuth()
    )
}

function getUsers(offset, count, filters){
    return axios.get(hostName + '/api/accounts?offset=' + offset + '&count=' + count, { params: {...filters}, ...addAuth() });
}

export {
    postLogin,
    getRole,
    getProperties,
    getPropertiesCount,
    postProperty,
    putPropertyStatus,
    getContacts,
    getContactsCount,
    getBusinesses,
    postContact,
    putContact,
    putBusiness,
    getUsers,
    
    // Reference data only below
    getBusinessTypes,
    getPropertyStatuses,
}