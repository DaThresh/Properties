let subscriptions = {
    status: []
}
let cache = {};

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
    logout,
    subscribeStatus,
    unsubscribeStatus,
}