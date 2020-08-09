// Event structure:
// {
//     event: 'toggle',
//     open: Boolean
// }

const subscriptions = [];

var open = false;

function openSidebar(){
    if(open) return;
    open = true;
    document.getElementById('sidebar').classList.add('expanded');
    subscriptions.forEach(callback => {
        callback({
            event: 'toggle',
            open: open,
        })
    })
}

function closeSidebar(){
    if(!open) return;
    open = false;
    document.getElementById('sidebar').classList.remove('expanded');
    subscriptions.forEach(callback => {
        callback({
            event: 'toggle',
            open: open,
        })
    })
}

function subscribe(callback){
    if(!subscriptions.includes(callback)) subscriptions.push(callback);
}

function unsubscribe(callback){
    if(subscriptions.includes(callback)) subscriptions.splice(subscriptions.indexOf(callback), 1);
}

function isOpen(){
    return open;
}

export {
    subscribe,
    unsubscribe,
    openSidebar,
    closeSidebar,
    isOpen,
}