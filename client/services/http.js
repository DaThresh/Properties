import { hostName } from './constants';
import { getToken } from './account';

import axios from 'axios';

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

export {
    postLogin,
    getProperties,
    postProperty,
}