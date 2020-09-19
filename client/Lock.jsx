import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';

// Services
import { login, setToken } from './services/account';

// Utilities
import { apiError } from './utilities/apiError';
import { capitalize } from './utilities/format';

function Lock(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [badCredentials, setBadCredentials] = useState(false);
    const setFunctions = {setEmail, setPassword};

    var handleChange = (event) => {
        let element = event.currentTarget;
        let functionName = 'set' + capitalize(element.name);
        if(setFunctions[functionName]) setFunctions[functionName](element.value);
    }

    var handleCheck = (event) => setRemember(!remember);

    var handleSubmit = (event) => {
        event.preventDefault();
        if(loggingIn) return;
        let token = null;
        setBadCredentials(false);
        setLoggingIn(true);
        login(email, password, remember)
        .then(data => token = data.token)
        .catch(error => apiError(error, {
            400: badCredentials,
        }))
        .finally(() => {
            setLoggingIn(false)
            if(token) setTimeout(() => setToken(token, remember), 0);
        });

        var badCredentials = (error) => {
            setBadCredentials(true);
        }
    }

    return (
        <section className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="card centered">
                    <header className="card-header">
                        <p className="card-header-title">
                            Gramercy Custom Homes
                        </p>
                    </header>
                    <div className="card-content" style={{paddingTop: '10px'}}>
                        <h2 className="is-size-3 has-text-weight-semibold has-text-centered">Sign in</h2>
                        {badCredentials ?
                            <h4 className="is-size-6 has-text-centered has-text-danger">Invalid login credentials</h4> :
                            ""
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input className="input" type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faAt} />
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input className="input" type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faKey} />
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <input className="is-checkradio" id="remember" type="checkbox" name="remember" onChange={handleCheck} />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <div className="field">
                                <button className={"button is-primary is-fullwidth" + (loggingIn ? " is-loading" : "")} type="submit">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Lock;