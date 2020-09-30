import {
    getOrganizations as fetch,
    getOrganizationsCount as fetchCount,
    getOrganization as fetchId,
} from './http';

import responseHandler from '../utilities/responseHandler';

function getOrganizations(offset = 0, count = 10, filters = {}){
    return responseHandler(fetch, 200, 'organizations', offset, count, filters);
}

function getOrganizationsCount(filters = {}){
    return responseHandler(fetchCount, 200, 'count', filters);
}

function getOrganization(id){
    return responseHandler(fetchId, 200, 'organization', id);
}

export {
    getOrganizations,
    getOrganizationsCount,
    getOrganization,
}