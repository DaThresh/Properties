import { getProperties as fetch,
        getPropertiesCount as fetchCount,
        postProperty,
        putPropertyStatus
    } from './http';

function getProperties(offset = 0, count = 10, filters = {}){
    return new Promise((resolve, reject) => {
        fetch(offset, count, {filters})
        .then(response => {
            if(response.status === 200) resolve(response.data.properties);
            else reject(response);
        })
        .catch(error => reject(error));
    });
}

function getPropertiesCount(filters = {}){
    return new Promise((resolve, reject) => {
        fetchCount({filters})
        .then(response => {
            if(response.status === 200) resolve(response.data.count);
            else reject(response);
        })
        .catch(error => reject(error));
    })
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

function updatePropertyStatus(propertyId, status){
    return new Promise((resolve, reject) => {
        putPropertyStatus(propertyId, status)
        .then(response => {
            if(response.status === 200) resolve();
            else reject(response);
        })
        .catch(error => reject(error));
    })
}

export {
    getProperties,
    getPropertiesCount,
    createProperty,
    updatePropertyStatus,
}