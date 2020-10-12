import { getProperties as fetch,
        getProperty as fetchId,
        getPropertiesCount as fetchCount,
        postProperty,
        postPropertyPictures,
        putPropertyStatus
    } from './http';

import responseHandler from '../utilities/responseHandler';

function getProperties(offset = 0, count = 10, filters = {}, sorts = {}){
    return responseHandler(fetch, 200, 'properties', offset, count, {filters}, {sorts});
}

function getProperty(id){
    return responseHandler(fetchId, 200, 'property', id);
}

function getPropertiesCount(filters = {}){
    return responseHandler(fetchCount, 200, 'count', {filters});
}

function createProperty(address, zipcode, lotWidth, lotDepth, purchaseDate){
    return responseHandler(postProperty, 201, 'property', address, zipcode, lotWidth, lotDepth, purchaseDate);
}

function uploadPictures(id, type, files){
    var formData = new FormData();
    files.forEach(file => formData.append(type, file));
    return responseHandler(postPropertyPictures, 200, null, id, formData);
}

function updatePropertyStatus(propertyId, status){
    return responseHandler(putPropertyStatus, 200, null, propertyId, status);
}

export {
    getProperties,
    getProperty,
    getPropertiesCount,
    createProperty,
    uploadPictures,
    updatePropertyStatus,
}