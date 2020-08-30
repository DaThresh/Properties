const defaultDuration = 15 * 1000; // 15 Seconds (measured in ms)
const notificationTypes = ['dark', 'link', 'info', 'success', 'warning', 'danger'];

var subscriptions = [];

function pushNotification(title, message, type, extraInfo = {}){
    if(!notificationTypes.includes(type)) return;
    var notification = {title, message, type};
    notification.duration = extraInfo.duration ? extraInfo.duration : defaultDuration;
    notification.createdAt = new Date().getTime();
    deliver(notification);
}

function subscribe(callback){
    if(!subscriptions.includes(callback)) subscriptions.push(callback);
}

function unsubscribe(callback){
    if(subscriptions.includes(callback)) subscriptions.splice(subscriptions.indexOf(callback), 1);
}

export {
    pushNotification,
    subscribe,
    unsubscribe,
}

function deliver(notification){
    subscriptions.forEach(callback => callback({
        event: 'deliver',
        notification,
    }));
}