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
    let elements = document.getElementsByClassName('sidebar-text');
    elements.forEach(element => {
        element.classList.remove('sidebar-text-exit');
        element.classList.add('sidebar-text-introduce');
    })
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
    let elements = document.getElementsByClassName('sidebar-text');
    elements.forEach(element => {
        element.classList.remove('sidebar-text-introduce');
        element.classList.add('sidebar-text-exit');
    });
    document.getElementById('sidebar').classList.remove('expanded');
    subscriptions.forEach(callback => {
        callback({
            event: 'toggle',
            open: open,
        })
    })
}

function toggleSidebar(){
    open ? closeSidebar() : openSidebar();
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
    toggleSidebar,
    isOpen,
}