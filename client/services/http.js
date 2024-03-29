import axios from 'axios';

import { getToken } from './account';

const hostName = 'http://' + window.location.host;

function addAuth(fileUpload = false){
    let options = {
        headers: {
            Authorization: getToken(),
        }
    };
    if(fileUpload) options.headers['Content-Type'] = 'multipart/form-data';
    return options;
}

// Properties
const getProperties = (offset, count, filters, sorts) => axios.get(hostName + '/api/properties?offset=' + offset + '&count=' + count, { params: {...filters, ...sorts}, ...addAuth() });
const getProperty = (id) => axios.get(hostName + '/api/properties/' + id, addAuth());
const getPropertiesCount = (filters) => axios.get(hostName + '/api/properties/count', { params: {...filters}, ...addAuth() });
const putPropertyStatus = (id, status) => axios.put(hostName + '/api/properties/' + id + '/status', {status}, addAuth());
const postPropertyPictures = (id, formData) => axios.post(hostName + '/api/properties/' + id + '/uploadPictures', formData, addAuth(true));
const putPicturesOrder = (id, type, order) => axios.put(hostName + '/api/properties/' + id + '/pictures', {type, order}, addAuth());
const putPictureType = (id, url) => axios.put(hostName + '/api/properties/' + id + '/picture', {url}, addAuth());
const deletePictures = (id, type, urls) => axios.delete(hostName + '/api/properties/' + id + '/pictures', { params: {type, urls}, ...addAuth() });
function postProperty(address, zipcode, lotWidth, lotDepth, purchaseDate){
    return axios.post(hostName + '/api/properties',
        {address, zipcode, lotWidth, lotDepth, purchaseDate},
        addAuth()
    )
}

// Contacts
const getContacts = (offset, count, filters, sorts) => axios.get(hostName + '/api/contacts?offset=' + offset + '&count=' + count, { params: {...filters, ...sorts}, ...addAuth() });
const getContactsCount = (filters) => axios.get(hostName + '/api/contacts/count', { params: {...filters}, ...addAuth() });
const getBusinesses = (filters) => axios.get(hostName + '/api/contacts/businesses', { params: {...filters}, ...addAuth() });
const putBusiness = (id, name, type)  => axios.put(hostName + '/api/contacts/businesses/' + id, {name, type}, addAuth());
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

// Users
const getUsers = (offset, count, filters, sorts) => axios.get(hostName + '/api/accounts?offset=' + offset + '&count=' + count, { params: {...filters, ...sorts}, ...addAuth() });
const getUsersCount = (filters) => axios.get(hostName + '/api/accounts/count', { params: {...filters}, ...addAuth() });
const postUser = (firstName, lastName, email, organization) => axios.post(hostName + '/api/accounts', {firstName, lastName, email, organization}, addAuth());

// Organizations
const getOrganizations = (offset, count, filters, sorts) => axios.get(hostName + '/api/organizations?offset=' + offset + '&count=' + count, { params: {...filters, ...sorts}, ...addAuth() });
const getOrganizationsCount = (filters) => axios.get(hostName + '/api/organizations/count', { params: {...filters}, ...addAuth() });
const getOrganization = (id) => axios.get(hostName + '/api/organizations/' + id, addAuth());
const postOrganization = (name) => axios.post(hostName + '/api/organizations', {name}, addAuth());
const postOrganizationPicture = (id, formData) => axios.post(hostName + '/api/organizations/' + id + '/picture', formData, addAuth(true));
const putOrganizationActive = (id, active) => axios.put(hostName + '/api/organizations/' + id + '/active', {active}, addAuth());

// Account + Reference
const postLogin = (email, password, remember) => axios.post(hostName + '/api/accounts/login', {email, password, remember});
const postAccessCode = (email, accessCode) => axios.post(hostName + '/api/accounts/accessCode', {email, accessCode});
const putAccessCode = (email, accessCode, password, confirmPassword) => axios.put(hostName + '/api/accounts/accessCode', {email, accessCode, password, confirmPassword});
const putSettings = (settings, values) => axios.put(hostName + '/api/accounts/settings', {settings, values}, addAuth());
const getAccount = () => axios.get(hostName + '/api/accounts/reference', addAuth());
const getBusinessTypes = () => axios.get(hostName + '/api/contacts/businessTypes', addAuth());
const getPropertyStatuses = () => axios.get(hostName + '/api/properties/statuses', addAuth());

export {
    // Property exports
    getProperties,
    getProperty,
    getPropertiesCount,
    postProperty,
    postPropertyPictures,
    putPropertyStatus,
    putPicturesOrder,
    putPictureType,
    deletePictures,

    // Contact exports
    getContacts,
    getContactsCount,
    getBusinesses,
    postContact,
    putContact,
    putBusiness,

    // Users exports
    getUsers,
    getUsersCount,
    postUser,

    // Organization exports
    getOrganizations,
    getOrganizationsCount,
    getOrganization,
    postOrganization,
    postOrganizationPicture,
    putOrganizationActive,

    // Account + Reference exports
    postLogin,
    postAccessCode,
    putAccessCode,
    putSettings,
    getAccount,
    getBusinessTypes,
    getPropertyStatuses,
}