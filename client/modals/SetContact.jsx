import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

// Services
import { getReferenceData } from '../services/reference';

// Utilities
import { capitalize } from '../utilities/format';

function SetContact(props){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // Add hook set methods for form fields into this object
    const setMethods = {setFirstName, setLastName};

    var submit = (event) => {
        event.preventDefault();
        console.log('submitted the form!');
    }

    var handleChange = (event) => {
        let setMethod = 'set' + capitalize(event.currentTarget.name)
        if(setMethods[setMethod]) setMethods[setMethod](event.currentTarget.value);
    }
    
    return (
        <form onSubmit={submit}>
            <div className="field">
                <label className="label">First name</label>
                <div className="control">
                    <input className="input" type="text" name="firstName" value={firstName} onChange={handleChange} placeholder="Enter first name..." />
                </div>
            </div>
            <div className="field">
                <label className="label">Last name</label>
                <div className="control">
                    <input className="input" type="text" name="lastName" value={lastName} onChange={handleChange} placeholder="Enter last name..." />
                </div>
            </div>
        </form>
    )
}

export default hot(SetContact);