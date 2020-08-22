import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

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
            <div className="leveL">
                <div className="level-left">
                    <div className="level-item">
                        <FontAwesomeIcon icon={faUserPlus} />
                        <p>Add Contact</p>
                    </div>
                </div>
            </div>
            <table className="table is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Title</th>
                        <th>Business</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => {
                        return (
                            <tr>
                                <td>{contact.fullName}</td>
                                <td>{contact.phoneNumber}</td>
                                <td>{contact.title}</td>
                                <td>{contact.business.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default hot(Contacts);