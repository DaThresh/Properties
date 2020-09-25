class Format {
    lowercase(string){
        if(string.length === 0) return string;
        let arr = string.split('');
        arr[0] = arr[0].toLowerCase();
        return arr.join('');
    }
}

module.exports = new Format();