import { postLogin, getRole as fetchRole } from './http';
import { fetchReferenceData } from './reference';

// Milliseconds until expire for new tokens
const expire = 4 * 60 * 60 * 1000; // 4 Hours
const rememberExpire = 7 * 24 * 60 * 60 * 1000; // 7 Days

let subscriptions = {
    status: []
}
let cache = {};

function login(email, password, remember){
    return new Promise((resolve, reject) => {
        postLogin(email, password, remember)
        .then(response => {
            if(response.status === 200) resolve(response.data);
            else reject(response);
        })
        .catch(error => reject(error));
    });
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

function getRole(){
    return new Promise((resolve, reject) => {
        if(cache?.role) resolve(cache.role);
        else if(!getToken()) resolve(0);
        else {
            fetchRole()
            .then(response => {
                if(response.status === 200){
                    cache.role = response.data.role;
                    resolve(cache.role);
                } else return Promise.reject({error: 'An unexpected error occurred'})
            })
            .catch(error => reject(error));
        }
    })
}

export {
    setToken,
    getToken,
    login,
    logout,
    subscribeStatus,
    unsubscribeStatus,
    getRole,
}