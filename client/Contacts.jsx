import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

// Components
import SetContact from './modals/SetContact';
import SetBusiness from './modals/SetBusiness';
import Pagination from './shared/Pagination';

// Services
import { getContacts, getContactsCount } from './services/contacts';
import { openModal, subscribe, unsubscribe } from './services/modal';
import { pushNotification } from './services/notifications';

// Utilities
import { apiError } from './utilities/apiError';
import { phoneNumber } from './utilities/format';

function Contacts(){
    const [fetching, setFetching] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(10);
    let pageCount = Math.ceil(count / 10);

    var fetch = () => {
        if(fetching) return;
        setFetching(true);
        var contacts, count;
        getContacts(10 * (page - 1), 10)
        .then(data => {
            contacts = data;
            return getContactsCount()
        })
        .then(data => count = data)
        .then(() => {
            setContacts(contacts);
            setCount(count);
        })
        .catch(error => {
            apiError(error);
            pushNotification('Error', 'Failed to load contacts', 'danger');
        })
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
    }, [page]);

    useEffect(() => {
        subscribe(receiveModalUpdate);
        return () => unsubscribe(receiveModalUpdate);
    })

    var changePage = (event) => {
        let num = Number(event.currentTarget.dataset.number);
        if(num !== NaN) setPage(num);
    }

    return(
        <span id="Contacts">
            <div className="container is-fluid is-sectioned">
                <div className="level">
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
            </div>
            <div className="container is-fluid is-sectioned">
                <table className="table is-hoverable is-bordered is-fullwidth">
                    <thead>
                        <tr className="is-left">
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
                                    <td>
                                        <ConditionalWrapper condition={contact.email} wrapper={children => (<a href={'mailto:' + contact.email}>{children}</a>)}>
                                            {contact.fullName}
                                        </ConditionalWrapper>
                                    </td>
                                    <td><a href={'tel:' + contact.phoneNumber}>{phoneNumber(contact.phoneNumber)}</a></td>
                                    <td>{contact.title}</td>
                                    <td data-contact={contact._id} onClick={openBusinessModal}>
                                        {contact.business.name}
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
            {pageCount > 1 ? <Pagination {...{pages, pageCount, changePage}} /> : null}
        </span>
    )
}

function ConditionalWrapper(props){
    return props.condition ? props.wrapper(props.children) : props.children;
}

export default Contacts;