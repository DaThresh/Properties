function capitalize(string){
    if(string.length === 0) return string;
    let arr = string.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
}

export {
    capitalize,
}