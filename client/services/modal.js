var subscriptions = [];
var modalOpen = false;

function openModal(component){
    modalOpen = true;
    notify('open', {component});
    document.querySelector('.modal').classList.add('is-active');
}

function closeModal(actionTaken = false){
    // This if often called from DOM events, so we want to filter those out
    if(typeof actionTaken !== 'boolean') actionTaken = false;
    modalOpen = false;
    notify('close', {actionTaken});
    document.querySelector('.modal').classList.remove('is-active');
}

function adjustSize(half){
    notify('size', {half});
}

function subscribe(callback){
    if(!subscriptions.includes(callback)) subscriptions.push(callback);
}

function unsubscribe(callback){
    if(subscriptions.includes(callback)) subscriptions.splice(subscriptions.indexOf(callback), 1);
}

function notify(event, extraInfo = {}){
    subscriptions.forEach(callback => {
        callback(Object.assign({event}, extraInfo));
    })
}

export {
    openModal,
    closeModal,
    adjustSize,
    subscribe,
    unsubscribe,
}