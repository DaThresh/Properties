import { getProperties as fetch,
        getPropertiesCount as fetchCount,
        postProperty,
        putPropertyStatus
    } from './http';

import responseHandler from '../utilities/responseHandler';

function getProperties(offset = 0, count = 10, filters = {}){
    return responseHandler(fetch, 200, 'properties', offset, count, {filters});
}

function getPropertiesCount(filters = {}){
    return responseHandler(fetchCount, 200, 'count', {filters});
}

function createProperty(address, zipcode, lotWidth, lotDepth, purchaseDate){
    return responseHandler(postProperty, 201, 'property', address, zipcode, lotWidth, lotDepth, purchaseDate);
}

function updatePropertyStatus(propertyId, status){
    return responseHandler(putPropertyStatus, 200, null, propertyId, status);
}

export {
    getProperties,
    getPropertiesCount,
    createProperty,
    updatePropertyStatus,
}