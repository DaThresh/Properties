import React, { useState, useEffect } from 'react';
import { faTag } from '@fortawesome/free-solid-svg-icons';

// Components
import HorizontalField from '../shared/Forms/HorizontalField';

// Services
import { getReferenceData } from '../services/reference';
import { updateBusiness } from '../services/contacts';
import { pushNotification } from '../services/notifications';
import { closeModal, adjustSize } from '../services/modal';

// Utilities
import { capitalize } from '../utilities/format';
import { apiError } from '../utilities/apiError';

function SetBusiness(props){
    const business = props.business;
    const businessTypes = getReferenceData('businessTypes');
    const [name, setName] = useState(business.name);
    const [businessType, setBusinessType] = useState(business.type);
    const [submitting, setSubmitting] = useState(false);
    const setFunctions = {setName, setBusinessType};

    useEffect(() => {
        adjustSize(true);
    }, []);

    var submit = (event) => {
        event.preventDefault();
        if(submitting) return;
        setSubmitting(true);
        let success = false;
        updateBusiness(business.id, name, businessType)
        .then(() => success = true)
        .catch(error => apiError(error))
        .finally(() => {
            if(!success) pushNotification('Error', 'Failed to update business', 'danger');
            closeModal(success);
        })
    }

    var handleChange = (event) => {
        let setFunction = 'set' + capitalize(event.currentTarget.name);
        if(setFunctions[setFunction]) setFunctions[setFunction](event.currentTarget.value);
    }

    return (
        <span id="SetContact">
            <h4 className="title is-4 has-text-centered">Edit Business</h4>
            <form autoComplete="off" onSubmit={submit}>
                <HorizontalField name="name" type="text" label="Name" handleChange={handleChange} value={name} placeholder="Incorporated LLC" attributes={{required: true}} />
                <HorizontalField name="businessType" type="select" label="Business type" handleChange={handleChange} value={businessType} icon={faTag}
                    options={businessTypes.map(businessType => <option key={businessType.id} value={businessType.name}>{businessType.name}</option>)}
                />
                <div className="field">
                    <div className="control has-text-centered">
                        <button className={'button is-primary' + (submitting ? ' is-loading' : '')} type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </span>
    )
}

export default SetBusiness;