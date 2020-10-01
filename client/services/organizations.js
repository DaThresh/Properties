import {
    getOrganizations as fetch,
    getOrganizationsCount as fetchCount,
    getOrganization as fetchId,
    postOrganization,
} from './http';

import responseHandler from '../utilities/responseHandler';

function getOrganizations(offset = 0, count = 10, filters = {}, sorts = {}){
    return responseHandler(fetch, 200, 'organizations', offset, count, {filters}, {sorts});
}

function getOrganizationsCount(filters = {}){
    return responseHandler(fetchCount, 200, 'count', filters);
}

function getOrganization(id){
    return responseHandler(fetchId, 200, 'organization', id);
}

function createOrganization(name){
    return responseHandler(postOrganization, 201, 'organization', name);
}

export {
    getOrganizations,
    getOrganizationsCount,
    getOrganization,
    createOrganization,
}