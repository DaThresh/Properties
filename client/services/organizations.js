import {
    getOrganizations as fetch,
    getOrganizationsCount as fetchCount,
} from './http';

import responseHandler from '../utilities/responseHandler';

function getOrganizations(offset = 0, count = 10, filters = {}){
    return responseHandler(fetch, 200, 'organizations', offset, count, filters);
}

function getOrganizationsCount(filters = {}){
    return responseHandler(fetchCount, 200, 'count', filters);
}

export {
    getOrganizations,
    getOrganizationsCount,
}