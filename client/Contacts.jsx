import React, { useState, useEffect, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

// Components
import List from './shared/List';
import SetContact from './modals/SetContact';
import SetBusiness from './modals/SetBusiness';

// Services
import { subscribe, unsubscribe, fetch } from './services/list';
import { getContacts, getContactsCount } from './services/contacts';
import { openModal } from './services/modal';

// Utilities
import { phoneNumber } from './utilities/format';

const tableHeaders = [
    {name: 'Name', sort: 'firstName'},
    {name: 'Phone Number', sort: 'phoneNumber'},
    {name: 'Title', sort: 'title'},
    {name: 'Business'},
    {name: 'Actions'},
]

function Contacts(){
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        subscribe(receiveListUpdate);
        return () => unsubscribe(receiveListUpdate);
    })

    var receiveListUpdate = (data) => {
        if(data.event === 'fetching') setFetching(data.fetching);
    }

    var openContactModal = (event) => {
        let props = {};
        if(event.currentTarget.dataset.new !== 'true'){
            props.contact = JSON.parse(event.currentTarget.dataset.contact);
        }
        openModal(<SetContact {...props} />);
    }

    var openBusinessModal = (event) => {
        let business = JSON.parse(event.currentTarget.dataset.business);
        openModal(<SetBusiness business={business} />);
    }

    var displayRow = (contact) => {
        return (
            <tr key={contact.id}>
                <td>
                    <ConditionalWrapper condition={contact.email} wrapper={children => (<a href={'mailto:' + contact.email}>{children}</a>)}>
                        {contact.fullName}
                    </ConditionalWrapper>
                </td>
                <td><a href={'tel:' + contact.phoneNumber}>{phoneNumber(contact.phoneNumber)}</a></td>
                <td>{contact.title}</td>
                <td data-business={JSON.stringify(contact.business)} onClick={openBusinessModal}>
                    {contact.business.name}
                </td>
                <td>
                    <button className="button" data-contact={JSON.stringify(contact)} data-new={false} onClick={openContactModal}>Edit</button>
                </td>
            </tr>
        )
    }

    return(
        <Fragment>
            <div className="container is-fluid is-sectioned">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item" data-new={true} onClick={openContactModal}>
                            <FontAwesomeIcon icon={faUserPlus} />
                            <p>Add Contact</p>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <FontAwesomeIcon icon={faSyncAlt} spin={fetching} onClick={() => fetch(true)} />
                        </div>
                    </div>
                </div>
            </div>
            <List tableHeaders={tableHeaders} fetchFunction={getContacts} fetchCountFunction={getContactsCount} displayRow={displayRow} />
        </Fragment>
    )
}

function ConditionalWrapper(props){
    return props.condition ? props.wrapper(props.children) : props.children;
}

export default Contacts;