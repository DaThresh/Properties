import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

// Services
import { useAccessCode } from '../services/account';

// Utilities
import { capitalize } from '../utilities/format';
import { apiError } from '../utilities/apiError';

function Setup(props){
    const { loading, setLoading, changePage } = props;
    const { name, email, accessCode } = props;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const setFunctions = {setPassword, setConfirmPassword};

    var submit = (event) => {
        event.preventDefault();
        if(loading) return;
        setLoading(true);
        var success = false;
        useAccessCode(email, accessCode, password, confirmPassword)
        .then(() => success = true)
        .catch(error => apiError(error))
        .finally(() => {
            setLoading(false);
            if(success) changePage("Login");
        })
    }

    var handleChange = (event) => {
        let setFunction = 'set' + capitalize(event.currentTarget.name);
        if(setFunctions[setFunction]) setFunctions[setFunction](event.currentTarget.value);
    }

    return (
        <div className="card centered">
            <div className="card-content">
                <form onSubmit={submit}>
                    <h2 className="is-size-3 has-text-weight-semibold has-text-centered">Welcome, {name}</h2>
                    <h3 className="is-size-5 has-text-centered mb-2">Create your password</h3>
                    <div className="field">
                        <div className="control has-icons-left">
                            <input type="password" className="input" name="password" value={password} onChange={handleChange} placeholder="Password..." required />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faKey} />
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control has-icons-left">
                            <input type="password" className="input" name="confirmPassword" value={confirmPassword} onChange={handleChange} placeholder="Password..." required />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faKey} />
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className={'button is-primary is-fullwidth' + (loading ? ' is-loading' : '')} type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <a className="card-footer-item is-secondary" onClick={changePage} data-page="Login">Back to Login</a>
            </div>
        </div>
    )
}

export default Setup;