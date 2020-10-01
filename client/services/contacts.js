import { 
    getContacts as fetch,
    getContactsCount as fetchCount,
    getBusinesses as fetchBusinesses,
    postContact,
    putContact,
    putBusiness,
} from './http';

import responseHandler from '../utilities/responseHandler';

function getContacts(offset = 0, count = 10, filters = {}, sorts = {}){
    return responseHandler(fetch, 200, 'contacts', offset, count, {filters}, {sorts});
}

function getContactsCount(filters = {}){
    return responseHandler(fetchCount, 200, 'count', {filters});
}

function getBusinesses(filters = {}){
    return responseHandler(fetchBusinesses, 200, 'businesses', {filters});
}

function createContact(firstName, lastName, email, phoneNumber, title, business, name, businessType){
    return responseHandler(postContact, 201, 'contact', firstName, lastName, email, phoneNumber, title, business, name, businessType);
}

function updateContact(contactId, firstName, lastName, email, phoneNumber, title, business, name, businessType){
    return responseHandler(putContact, 200, 'contact', contactId, firstName, lastName, email, phoneNumber, title, business, name, businessType);
}

function updateBusiness(businessId, name, type){
    return responseHandler(putBusiness, 200, 'business', businessId, name, type);
}

export {
    getContacts,
    getContactsCount,
    getBusinesses,
    createContact,
    updateContact,
    updateBusiness,
}