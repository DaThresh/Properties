var subscriptions = [];

function subscribe(callback){
    if(!subscriptions.includes(callback)) subscriptions.push(callback);
}

function unsubscribe(callback){
    if(subscriptions.includes(callback)) subscriptions.splice(subscriptions.indexOf(callback), 1);
}

function fetch(fetchCount = false){
    if(typeof fetchCount !== 'boolean') fetchCount = false;
    notify('fetch', {fetchCount});
}

function fetchingUpdate(fetching){
    notify('fetching', {fetching})
}

export {
    subscribe,
    unsubscribe,
    fetch,
    fetchingUpdate,
}

function notify(event, extraInfo = {}){
    subscriptions.forEach(callback => {
        callback({ ...{event}, ...extraInfo });
    })
}