import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBuilding, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Services
import { getBusinesses } from '../services/contacts';
import { getReferenceData } from '../services/reference';

// Utilities
import { capitalize } from '../utilities/format';
import { apiError } from '../utilities/apiError';

function SetContact(props){
    const [submitting, setSubmitting] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [businessTypes, setBusinessTypes] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [title, setTitle] = useState('');
    const [business, setBusiness] = useState('add');
    const [name, setName] = useState('');
    const [businessType, setBusinessType] = useState('');
    // Add hook set methods for form fields into this object
    const setMethods = {setFirstName, setLastName, setEmail, setPhoneNumber, setTitle, setBusiness, setName, setBusinessType};

    useEffect(() => {
        getBusinesses()
        .then(businesses => setBusinesses(businesses))
        .catch(error => apiError(error));
        setBusinessTypes(getReferenceData('businessTypes'));
    }, []);

    // Handle submission of form here
    var submit = (event) => {
        console.log('submitted the form!');
        event.preventDefault();
    }

    var handleChange = (event) => {
        let setMethod = 'set' + capitalize(event.currentTarget.name)
        if(setMethods[setMethod]) setMethods[setMethod](event.currentTarget.value);
    }
    
    return (
        <span id="SetContact">
            <div className="columns">
                <div className="column">
                    <h4 className="title is-4 has-text-centered">New Contact</h4>
                    <form autoComplete="off" onSubmit={submit}>
                        <div className="field">
                            <div className="control">
                            <label className="label">First name</label>
                                <input className="input" type="text" name="firstName" value={firstName} onChange={handleChange} placeholder="Enter first name..." required />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                            <label className="label">Last name</label>
                                <input className="input" type="text" name="lastName" value={lastName} onChange={handleChange} placeholder="Enter last name..." />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left">
                                <input className="input" type="email" name="email" value={email} onChange={handleChange} placeholder="joe@doe.com" />
                                <div className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Phone number</label>
                            <div className="control has-icons-left">
                                <input className="input" type="tel" name="phoneNumber" value={phoneNumber} onChange={handleChange} placeholder="2149008000" maxLength="10" />
                                <div className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control has-icons-left">
                                <input className="input" type="text" name="title" value={title} onChange={handleChange} placeholder="Manager" />
                                <div className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faBriefcase} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Business</label>
                            <div className="control has-icons-left">
                                <div className="select">
                                    <select name="business" value={business} onChange={handleChange}>
                                        {businesses.map(business => {
                                            return (
                                                <option key={business._id} value={business.name}>{capitalize(business.name)}</option>
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
                    </form>
                </div>
                {business == 'add' ? (
                    <div className="column">
                        <h4 className="title is-4 has-text-centered">New Business</h4>
                        <form autoComplete="off" onSubmit={submit}>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input className="input" type="text" name="name" value={name} onChange={handleChange} placeholder="Incorporated LLC" />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Business type</label>
                                <div className="select">
                                    <select name="businessType" value={businessType} onChange={handleChange}>
                                        {businessTypes.map(businessType => {
                                            return (
                                                <option key={businessType._id} value={businessType.name}>{capitalize(businessType.name)}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : null}
            </div>
            <div className="field">
                <div className={'control' + (business == 'add' ? ' has-text-centered' : '')}>
                    <button className="button is-primary" onClick={submit}>Submit</button>
                </div>
            </div>
        </span>
    )
}

export default hot(SetContact);