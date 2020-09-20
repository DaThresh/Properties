module.exports = (inputs, required) => {
    return new Promise((resolve, reject) => {
        let notFound = [];
        required.forEach(field => {
            if(typeof inputs[field] == 'undefined' || inputs[field] == '') notFound.push("'" + field + "'" + " field is required");
        });
        if(notFound.length > 0) reject({'required': notFound});
        else resolve();
    });
}