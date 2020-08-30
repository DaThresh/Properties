import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

// Components
import SetContact from './modals/SetContact';
import SetBusiness from './modals/SetBusiness';

// Services
import { getContacts } from './services/contacts';
import { openModal, subscribe, unsubscribe } from './services/modal';

// Utilities
import { apiError } from './utilities/apiError';
import { capitalize } from './utilities/format';

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
        if(data.event === 'close' && data.actionTaken) fetch();
    }

    var openContactModal = (event) => {
        let extraProps = {};
        if(event.currentTarget.dataset.new !== 'true'){
            let contactId = event.currentTarget.dataset.contact;
            extraProps.contact = contacts.find(contact => contact._id === contactId);
        }
        openModal(<SetContact {...extraProps} />);
    }

    var openBusinessModal = (event) => {
        let props = {};
        let contactId = event.currentTarget.dataset.contact;
        props.business = contacts.find(contact => contact._id === contactId).business;
        openModal(<SetBusiness {...props} />);
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
                    <div className="level-item" data-new={true} onClick={openContactModal}>
                        <FontAwesomeIcon icon={faUserPlus} />
                        <p>Add Contact</p>
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item" onClick={fetch}>
                        <FontAwesomeIcon icon={faSyncAlt} spin={fetching} />
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
                            <tr key={contact._id}>
                                <td>{capitalize(contact.firstName) + ' ' + capitalize(contact.lastName)}</td>
                                <td>{contact.phoneNumber}</td>
                                <td>{capitalize(contact.title)}</td>
                                <td data-contact={contact._id} onClick={openBusinessModal}>
                                    {capitalize(contact.business.name)}
                                </td>
                                <td>
                                    <button className="button" data-contact={contact._id} data-new={false} onClick={openContactModal}>Edit</button>
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