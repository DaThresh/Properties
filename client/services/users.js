import { getUsers as fetch, getUsersCount as fetchCount } from './http';

import responseHandler from '../utilities/responseHandler';

function getUsers(offset = 0, count = 0, filters = {}){
    return responseHandler(fetch, 200, 'accounts', offset, count, filters);
}

function getUsersCount(filters){
    return responseHandler(fetchCount, 200, 'count', filters);
}

export {
    getUsers,
    getUsersCount,
}