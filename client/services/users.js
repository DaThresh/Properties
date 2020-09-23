import { getUsers as fetch } from './http';

import responseHandler from '../utilities/responseHandler';

function getUsers(offset = 0, count = 0, filters = {}){
    return responseHandler(fetch, 200, 'accounts', offset, count, filters);
}

export {
    getUsers,
}