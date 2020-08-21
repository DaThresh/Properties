function capitalize(string){
    let arr = string.split('');
    arr[0].toUpperCase();
    return arr.join('');
}

export {
    capitalize,
}