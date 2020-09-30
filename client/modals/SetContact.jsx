import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBuilding, faPhone, faEnvelope, faTag } from '@fortawesome/free-solid-svg-icons';

// Services
import { getBusinesses, createContact, updateContact } from '../services/contacts';
import { getReferenceData } from '../services/reference';
import { closeModal, adjustSize } from '../services/modal';
import { pushNotification } from '../services/notifications';

// Utilities
import { capitalize } from '../utilities/format';
import { apiError } from '../utilities/apiError';

function SetContact(props){
    var getInitial = (fieldName) => {
        if(!props.contact) return '';
        return props?.contact[fieldName] ?? '';
    }

    const businessTypes = getReferenceData('businessTypes');
    const [submitting, setSubmitting] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [firstName, setFirstName] = useState(getInitial('firstName'));
    const [lastName, setLastName] = useState(getInitial('lastName'));
    const [email, setEmail] = useState(getInitial('email'));
    const [phoneNumber, setPhoneNumber] = useState(getInitial('phoneNumber'));
    const [title, setTitle] = useState(getInitial('title'));
    const [business, setBusiness] = useState(props?.contact?.business?.name ?? 'add');
    const [name, setName] = useState('');
    const [businessType, setBusinessType] = useState(businessTypes[0].name);
    // Add hook set methods for form fields into this object
    const setMethods = {setFirstName, setLastName, setEmail, setPhoneNumber, setTitle, setBusiness, setName, setBusinessType};

    useEffect(() => {
        getBusinesses()
        .then(businesses => setBusinesses(businesses))
        .catch(error => apiError(error));
    }, []);

    useEffect(() => {
        if(business === 'add' && name !== '') setName('');
        if(business === 'add') setBusinessType(businessTypes[0].name);
        adjustSize(business !== 'add');
    }, [business]);

    var submit = (event) => {
        event.preventDefault();
        if(submitting) return;
        setSubmitting(true);
        var success = false;
        if(props.contact){
            updateContact(props.contact.id, firstName, lastName, email, phoneNumber, title, business, name, businessType)
            .then(() => success = true)
            .catch(error => apiError(error))
            .finally(() => end());
        } else {
            createContact(firstName, lastName, email, phoneNumber, title, business, name, businessType)
            .then(() => success = true)
            .catch(error => apiError(error))
            .finally(() => end());
        }

        function end(){
            if(!success) pushNotification('Error', props.contact ? 'Failed to update contact' : 'Failed to create new contact', 'danger');
            closeModal(success);
        }
    }

    var handleChange = (event) => {
        let setMethod = 'set' + capitalize(event.currentTarget.name)
        if(setMethods[setMethod]) setMethods[setMethod](event.currentTarget.value);
    }
    
    return (
        <span id="SetContact">
            <form autoComplete="off" onSubmit={submit}>
                <div className="columns">
                    <div className="column">
                        <h4 className="title is-4 has-text-centered">New Contact</h4>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">First name</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="text" name="firstName" value={firstName} onChange={handleChange} placeholder="Enter first name..." required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Last name</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="text" name="lastName" value={lastName} onChange={handleChange} placeholder="Enter last name..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Email</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control has-icons-left">
                                        <input className="input" type="email" name="email" value={email} onChange={handleChange} placeholder="joe@doe.com" />
                                        <div className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Phone number</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control has-icons-left">
                                        <input className="input" type="tel" name="phoneNumber" value={phoneNumber} onChange={handleChange} placeholder="2149008000" maxLength="10" />
                                        <div className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Title</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control has-icons-left">
                                        <input className="input" type="text" name="title" value={title} onChange={handleChange} placeholder="Manager" />
                                        <div className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faBriefcase} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Business</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control has-icons-left">
                                        <div className="select">
                                            <select name="business" value={business} onChange={handleChange}>
                                                {businesses.map(business => {
                                                    return (
                                                        <option key={business.id} value={business.name}>{business.name}</option>
                                                    )
                                                })}
                                                <option value="add">Add</option>
                                            </select>
                                        </div>
                                        <div className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faBuilding} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {business == 'add' ? (
                        <div className="column">
                            <h4 className="title is-4 has-text-centered">New Business</h4>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Name</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="text" name="name" value={name} onChange={handleChange} placeholder="Incorporated LLC" required />
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
                        </div>
                    ) : null}
                </div>
                <div className="field">
                    <div className="control has-text-centered">
                        <button className={'button is-primary' + (submitting ? ' is-loading' : '')} type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </span>
    )
}

export default SetContact;