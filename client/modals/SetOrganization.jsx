import React, { useState, useEffect } from 'react';

// Components
import HorizontalField from '../shared/Forms/HorizontalField';

// Services
import { createOrganization } from '../services/organizations';
import { pushNotification } from '../services/notifications';
import { closeModal, adjustSize } from '../services/modal';

// Utilities
import { capitalize } from '../utilities/format';
import { apiError } from '../utilities/apiError';

function SetOrganization(props){
    const [submitting, setSubmitting] = useState(false);
    const [name, setName] = useState('');
    const setFunctions = {setName};

    useEffect(() => {
        adjustSize(true);
    }, []);

    var submit = (event) => {
        event.preventDefault();
        if(submitting) return;
        setSubmitting(true);
        var success = false;
        createOrganization(name)
        .then(() => success = true)
        .catch(error => apiError(error))
        .finally(() => {
            if(!success) pushNotification('Error', 'Failed to create organization', 'danger');
            closeModal(success);
        })
    }

    var handleChange = (event) => {
        let functionName = 'set' + capitalize(event.currentTarget.name);
        if(setFunctions[functionName]) setFunctions[functionName](event.currentTarget.value);
    }

    return (
        <form onSubmit={submit}>
            <HorizontalField name="name" type="text" label="Name" handleChange={handleChange} value={name} placeholder="Enter organization name..." attributes={{required: true}} />
            <div className="field">
                <div className="control has-text-centered">
                    <button className={'button is-primary' + (submitting ? ' is-loading' : '')} type="submit">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default SetOrganization;