var subscriptions = [];
var modalOpen = false;

function openModal(component, props = {}){
    modalOpen = true;
    notify('open', {component, props});
    document.querySelector('.modal').classList.add('is-active');
}

function closeModal(){
    modalOpen = false;
    notify('close');
    document.querySelector('.modal').classList.remove('is-active');
}

function subscribe(callback){
    if(!subscriptions.includes(callback)) subscriptions.push(callback);
}

function unsubscribe(callback){
    if(subscriptions.includes(callback)) subscriptions.splice(subscriptions.indexOf(callback), 1);
}

function notify(event, extraInfo = {}){
    subscriptions.forEach(callback => {
        callback(Object.assign(extraInfo, {event}));
    })
}

export {
    openModal,
    closeModal,
    subscribe,
    unsubscribe,
}