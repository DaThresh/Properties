import { getProperties as fetch } from './http';
import { apiError } from '../utilities/apiError';

function getProperties(offset = 0, count = 10){
    return new Promise((resolve, reject) => {
        fetch(offset, count)
        .then(response => {
            if(response.status === 200) resolve(response.data.properties);
            else reject(response);
        })
        .catch(error => reject(error));
    });
}

export {
    getProperties,
}