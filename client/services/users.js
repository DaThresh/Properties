import { getUsers as fetch, getUsersCount as fetchCount, postUser } from './http';

import responseHandler from '../utilities/responseHandler';

function getUsers(offset = 0, count = 10, filters = {}, sorts = {}){
    return responseHandler(fetch, 200, 'accounts', offset, count, {filters}, {sorts});
}

function getUsersCount(filters){
    return responseHandler(fetchCount, 200, 'count', {filters});
}

function createUser(firstName, lastName, email, organization){
    return responseHandler(postUser, 201, 'account', firstName, lastName, email, organization);
}

export {
    getUsers,
    getUsersCount,
    createUser,
}