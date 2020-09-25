import React, { useState, useEffect } from 'react';

// Services
import { getReferenceData } from '../services/reference';
import { updateBusiness } from '../services/contacts';
import { pushNotification } from '../services/notifications';
import { closeModal, adjustSize } from '../services/modal';

// Utilities
import { capitalize } from '../utilities/format';
import { apiError } from '../utilities/apiError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

function SetBusiness(props){
    const business = props.business;
    const businessTypes = getReferenceData('businessTypes', 'array');
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
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Name</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" name="name" value={name} onChange={handleChange} placeholder="Incorporated LLC" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Business type</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control has-icons-left">
                                <div className="select">
                                    <select name="businessType" value={businessType} onChange={handleChange}>
                                        {businessTypes.map(businessType => {
                                            return (
                                                <option key={businessType.id} value={businessType.name}>{businessType.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faTag} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <div className="control has-text-centered">
                        <button className={'button is-primary' + (submitting ? ' is-loading' : '')} onClick={submit}>Submit</button>
                    </div>
                </div>
            </form>
        </span>
    )
}

export default SetBusiness;