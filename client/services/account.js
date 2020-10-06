import { postLogin, postAccessCode, putAccessCode, putSettings } from './http';
import { fetchReferenceData } from './reference';
import responseHandler from '../utilities/responseHandler';

// Milliseconds until expire for new tokens
const expire = 4 * 60 * 60 * 1000; // 4 Hours
const rememberExpire = 7 * 24 * 60 * 60 * 1000; // 7 Days

let subscriptions = {
    status: []
}

function login(email, password, remember){
    return responseHandler(postLogin, 200, null, email, password, remember);
}

function checkAccessCode(email, accessCode){
    return responseHandler(postAccessCode, 200, null, email, accessCode);
}

function useAccessCode(email, accessCode, password, confirmPassword){
    return responseHandler(putAccessCode, 200, null, email, accessCode, password, confirmPassword);
}

function changeSettings(settings, values){
    return responseHandler(putSettings, 200, null, settings, values);
}

function setToken(token, remember){
    let expireDatetime = new Date().getTime() - 5000 + (remember ? rememberExpire : expire);
    localStorage.setItem('expire', String(expireDatetime));
    localStorage.setItem('token', token);
    fetchReferenceData();
    subscriptions.status.forEach(callback => {
        callback({
            event: 'login',
        })
    })
}

function getToken(){
    let expireDatetime = localStorage.getItem('expire');
    if(expireDatetime != null){
        let date = new Date(Number(expireDatetime));
        if(date <= new Date()) logout();
    }
    return localStorage.getItem('token');
}

function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
    subscriptions.status.forEach(callback => {
        callback({
            event: 'logout',
        })
    })
}

function subscribeStatus(callback){
    if(!subscriptions.status.includes(callback)) subscriptions.status.push(callback);
}

function unsubscribeStatus(callback){
    if(subscriptions.status.includes(callback)){
        subscriptions.status.splice(subscriptions.status.indexOf(callback), 1);
    }
}

export {
    setToken,
    getToken,
    login,
    checkAccessCode,
    useAccessCode,
    changeSettings,
    logout,
    subscribeStatus,
    unsubscribeStatus,
}