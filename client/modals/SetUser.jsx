import React, { useState, useEffect } from 'react';

// Components
import HorizontalField from '../shared/Forms/HorizontalField';
import Display from './Display';

// Services
import { adjustSize, closeModal, openModal } from '../services/modal';
import { createUser } from '../services/users';
import { pushNotification } from '../services/notifications';

// Utilities
import { capitalize } from '../utilities/format';
import { apiError } from '../utilities/apiError';

function SetUser(props){
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const setFunctions = {setFirstName, setLastName, setEmail};
    const organization = props?.organization ?? null;

    useEffect(() => {
        adjustSize(true);
    }, []);
    
    var submit = (event) => {
        event.preventDefault();
        if(loading) return;
        setLoading(true);
        var accessCode = null;
        createUser(firstName, lastName, email, organization)
        .then(data => accessCode = data)
        .catch(error => apiError(error))
        .finally(() => {
            if(!accessCode){
                pushNotification('Error', 'Failed to create user', 'danger');
                closeModal(false);
            } else if(ENVIRONMENT === 'development') openModal(<Display data={firstName + ' ' + lastName + ' created with access code: ' + accessCode} />)
            else closeModal(true);
        })
    }

    var handleChange = (event) => {
        let setFunction = 'set' + capitalize(event.currentTarget.name);
        if(setFunctions[setFunction]) setFunctions[setFunction](event.currentTarget.value);
    }

    return (
        <form onSubmit={submit}>
            <h2 className="title is-3 has-text-centered">New User Details</h2>
            <HorizontalField name="firstName" type="text" label="First name" handleChange={handleChange} value={firstName} placeholder="Enter first name..." attributes={{required: true}} />
            <HorizontalField name="lastName" type="text" label="Last name" handleChange={handleChange} value={lastName} placeholder="Enter last name..." attributes={{required: true}} />
            <HorizontalField name="email" type="email" label="Email" handleChange={handleChange} value={email} placeholder="Enter email..." attributes={{required: true}} />
            <div className="field">
                <div className="control has-text-centered">
                    <button className={'button is-primary' + (loading ? ' is-loading' : '')} type="submit">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default SetUser;