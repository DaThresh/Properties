import { getUsers as fetch } from './http';

function getUsers(offset = 0, count = 0){
    return new Promise((resolve, reject) => {
        fetch(offset, count)
        .then(response => {
            if(response.status === 200) resolve(response.data.accounts);
            else reject(response);
        })
        .catch(error => reject(error));
    })
}

export {
    getUsers,
}