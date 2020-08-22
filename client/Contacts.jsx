import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

// Services
import { getContacts } from './services/contacts';
import { openModal, subscribe, unsubscribe } from './services/modal';

// Utilities
import { apiError } from './utilities/apiError';

function Contacts(props){
    const [fetching, setFetching] = useState(false);
    const [contacts, setContacts] = useState([]);

    var fetch = () => {
        if(fetching) return;
        setFetching(true);
        getContacts()
        .then(contacts => setContacts(contacts))
        .catch(error => apiError(error))
        .finally(() => setFetching(false));
    }

    var receiveModalUpdate = (data) => {
        if(data.event !== 'close') return;
        fetch();
    }

    // Simply these two functions to one using element attributes (new vs existing)
    var openNewContactModal = () => {
        openModal('SetContact', {new: true});
    }

    var openEditContactModal = () => {
        openModal('SetContact', {new: false});
    }

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        subscribe(receiveModalUpdate);
        return () => unsubscribe(receiveModalUpdate);
    })

    return(
        <div>
            <div className="leveL">
                <div className="level-left">
                    <div className="level-item" onClick={openNewContactModal}>
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
                        <th>Actions</th>
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
                                <td>
                                    <button className="button" onClick={openEditContactModal}>Edit</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default hot(Contacts);