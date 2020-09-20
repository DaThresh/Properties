import { getProperties as fetch, postProperty } from './http';

function getProperties(offset = 0, count = 10){
    return new Promise((resolve, reject) => {
        fetch(offset, count)
        .then(response => {
            if(response.status === 200) resolve(response.data.properties);
            else reject(response);
        })
        .catch(error => reject(error));
    });
}

function createProperty(address, zipcode, lotWidth, lotDepth, purchaseDate){
    return new Promise((resolve, reject) => {
        postProperty(address, zipcode, lotWidth, lotDepth, purchaseDate)
        .then(response => {
            if(response.status === 201) resolve(response.data.property);
            else reject(response);
        })
        .catch(error => reject(error));
    });
}

export {
    getProperties,
    createProperty,
}