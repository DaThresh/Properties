import {
    getOrganizations as fetch,
    getOrganizationsCount as fetchCount,
    getOrganization as fetchId,
    postOrganization,
    postOrganizationPicture,
    putOrganizationActive,
} from './http';

import { getReferenceData } from './reference';
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

function uploadProfilePhoto(file){
    var formData = new FormData();
    formData.append('profilePicture', file);
    return responseHandler(postOrganizationPicture, 200, 'profilePictureUrl', getReferenceData('organization').id, formData);
}

function setOrganizationActive(id, active){
    return responseHandler(putOrganizationActive, 200, 'organization', id, active);
}

export {
    getOrganizations,
    getOrganizationsCount,
    getOrganization,
    createOrganization,
    uploadProfilePhoto,
    setOrganizationActive,
}