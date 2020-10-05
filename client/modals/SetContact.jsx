import React, { useState, useEffect, Fragment } from 'react';
import { faBriefcase, faBuilding, faPhone, faEnvelope, faTag } from '@fortawesome/free-solid-svg-icons';

// Components
import HorizontalField from '../shared/Forms/HorizontalField';

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
        <form autoComplete="off" onSubmit={submit}>
            <div className="columns">
                <div className="column">
                    <h4 className="title is-4 has-text-centered">New Contact</h4>
                    <HorizontalField name="firstName" type="text" label="First name" handleChange={handleChange} value={firstName} placeholder="Enter first name..." attributes={{required: true}} />
                    <HorizontalField name="lastName" type="text" label="Last name" handleChange={handleChange} value={lastName} placeholder="Enter last name..." />
                    <HorizontalField name="email" type="email" label="Email" handleChange={handleChange} value={email} placeholder="joe@doe.com" icon={faEnvelope} />
                    <HorizontalField name="phoneNumber" type="tel" label="Phone number" handleChange={handleChange} value={phoneNumber} placeholder="2149008000" icon={faPhone} attributes={{maxLength: 10}} />
                    <HorizontalField name="title" type="text" label="Title" handleChange={handleChange} value={title} placeholder="Manager" icon={faBriefcase} />
                    <HorizontalField name="business" type="select" label="Business" handleChange={handleChange} value={business} icon={faBuilding}
                        options={
                            <Fragment>
                                {businesses.map(business => <option key={business.id} value={business.name}>{business.name}</option>)}
                                <option value="add">Add</option>
                            </Fragment>
                        }
                    />
                </div>
                {business == 'add' ? (
                    <div className="column">
                        <h4 className="title is-4 has-text-centered">New Business</h4>
                        <HorizontalField name="name" type="text" label="Name" handleChange={handleChange} value={name} placeholder="Incorporated LLC" attributes={{required: true}} />
                        <HorizontalField name="businessType" type="select" label="Business type" handleChange={handleChange} value={businessType} icon={faTag}
                            options={businessTypes.map(businessType => <option key={businessType.id} value={businessType.name}>{businessType.name}</option>)}
                        />
                    </div>
                ) : null}
            </div>
            <div className="field">
                <div className="control has-text-centered">
                    <button className={'button is-primary' + (submitting ? ' is-loading' : '')} type="submit">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default SetContact;