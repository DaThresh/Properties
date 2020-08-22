import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

// Services
import { getReferenceData } from '../services/reference';

// Utilities
import { capitalize } from '../utilities/format';

function SetContact(props){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    var submit = (event) => {
        event.preventDefault();
        console.log('submitted the form!');
    }
    
    return (
        <form onSubmit={submit}>
            <div className="field">
                <label className="label">First name</label>
                <div className="control">
                    <input className="input" type="text" name="firstName" value={firstName} placeholder="Enter first name..." />
                </div>
            </div>
            <div className="field">
                <label className="label">Last name</label>
                <div className="control">
                    <input className="input" type="text" name="lastName" value={lastName} placeholder="Enter last name..." />
                </div>
            </div>
        </form>
    )
}

export default hot(SetContact);