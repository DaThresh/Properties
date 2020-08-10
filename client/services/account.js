import { postLogin } from './http';

let subscriptions = {
    status: []
}
let cache = {};

function login(email, password, remember){
    return new Promise((resolve, reject) => {
        postLogin(email, password, remember)
        .then(response => {
            if(response.status === 200) resolve(response.data.token);
            else reject(response);
        })
        .catch(error => reject(error));
    });
}

function setToken(token){
    localStorage.setItem('token', token);
    subscriptions.status.forEach(callback => {
        callback({
            event: 'login',
        })
    })
}

function getToken(){
    return localStorage.getItem('token');
}

function logout(){
    localStorage.removeItem('token');
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
    logout,
    subscribeStatus,
    unsubscribeStatus,
}