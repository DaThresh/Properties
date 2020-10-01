import { getUsers as fetch, getUsersCount as fetchCount } from './http';

import responseHandler from '../utilities/responseHandler';

function getUsers(offset = 0, count = 10, filters = {}, sorts = {}){
    return responseHandler(fetch, 200, 'accounts', offset, count, {filters}, {sorts});
}

function getUsersCount(filters){
    return responseHandler(fetchCount, 200, 'count', {filters});
}

export {
    getUsers,
    getUsersCount,
}