import { 
    getContacts as fetch,
    getBusinesses as fetchBusinesses,
    postContact,
} from './http';

function getContacts(offset = 0, count = 10){
    return new Promise((resolve, reject) => {
        fetch(offset, count)
        .then(response => {
            if(response.status === 200) resolve(response.data.contacts);
            else reject(response);
        })
        .catch(error => reject(error));
    });
}

function getBusinesses(){
    return new Promise((resolve, reject) => {
        fetchBusinesses()
        .then(response => {
            if(response.status === 200) resolve(response.data.businesses);
            else reject(response);
        })
        .catch(error => reject(error));
    })
}

function createContact(firstName, lastName, email, phoneNumber, title, business, name, businessType){
    return new Promise((resolve, reject) => {
        postContact(firstName, lastName, email, phoneNumber, title, business, name, businessType)
        .then(response => {
            if(response.status === 201) resolve();
            else reject(response);
        })
        .catch(error => reject(error));
    })
}

export {
    getContacts,
    getBusinesses,
    createContact,
}