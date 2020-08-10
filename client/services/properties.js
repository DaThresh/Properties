import { getProperties as fetch } from './http';
import { errorHandler } from '../utilities/apiError';

function getProperties(offset = 0, count = 10){
    return new Promise((resolve, reject) => {
        fetch(offset, count)
        .then(response => {
            console.log(response);
            if(response.code === 200) resolve(response.data.properties);
            else reject();
        })
        .catch(error => reject(errorHandler(error)));
    });
}

export {
    getProperties,
}