import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faAt } from '@fortawesome/free-solid-svg-icons';

// Services
import { checkAccessCode } from '../services/account';

// Utilities
import { capitalize } from '../utilities/format';
import { apiError } from '../utilities/apiError';

function AccessCode(props){
    const { loading, setLoading, changePage } = props;
    const [email, setEmail] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const setFunctions = {setAccessCode, setEmail};

    var submit = (event) => {
        event.preventDefault();
        if(loading) return;
        setLoading(true);
        let isValid = false;
        checkAccessCode(email, accessCode)
        .then(valid => isValid = valid)
        .catch(error => apiError(error))
        .finally(() => {
            if(isValid){
                setLoading(false);
                changePage('Setup');
            }
        })
    }

    var handleChange = (event) => {
        let setFunction = 'set' + capitalize(event.currentTarget.name);
        if(setFunctions[setFunction]) setFunctions[setFunction](event.currentTarget.value);
    }

    return (
        <div className="card centered">
            <div className="card-content">
                <h2 className="is-size-3 has-text-weight-semibold has-text-centered">Verify Access Code</h2>
                <form onSubmit={submit}>
                    <div className="field">
                        <div className="control has-icons-left">
                            <input className="input" type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faAt} />
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control has-icons-left">
                            <input className="input" type="password" name="accessCode" placeholder="Access Code" value={accessCode} onChange={handleChange} required />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faKeyboard} />
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <button className={"button is-primary is-fullwidth" + (loading ? " is-loading" : "")} type="submit">
                            Check access code
                        </button>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <a className="card-footer-item is-secondary" onClick={changePage} data-page="Login">Back to Login</a>
            </div>
        </div>
    )
}

export default AccessCode;