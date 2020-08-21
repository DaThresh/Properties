import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

// Services
import { getContacts } from './services/contacts';

// Utilities
import { apiError } from './utilities/apiError';

function Contacts(props){
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getContacts()
        .then(contacts => setContacts(contacts))
        .catch(error => apiError(error));
    }, []);

    return(
        <div>
            contacts
        </div>
    )
}

export default hot(Contacts);