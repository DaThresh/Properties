function capitalize(string){
    if(string.length === 0) return string;
    let arr = string.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
}

function phoneNumber(phoneNumber){
    let string = String(phoneNumber);
    let array = string.split('');
    array.splice(3,0,'-');
    array.splice(7,0,'-');
    return array.join('');
}

export {
    capitalize,
    phoneNumber,
}