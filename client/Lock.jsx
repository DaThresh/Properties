import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';

// Services
import { login, setToken } from './services/account';

// Utilities
import { apiError } from './utilities/apiError';

function Lock(props){
    const approvedList = ['Email', 'Password'];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [badCredentials, setBadCredentials] = useState(false);

    var handleChange = (event) => {
        let element = event.target;
        if(!approvedList.includes(element.name)) return;
        eval('set' + element.name + '("' + element.value + '")')
    }

    var handleCheck = (event) => {
        setRemember(!remember);
    }

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
                            Company Name
                        </p>
                    </header>
                    <div className="card-content" style={{paddingTop: '10px'}}>
                        <h2 className="is-size-3 has-text-weight-semibold has-text-centered">Sign in</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input className="input" type="email" name="Email" placeholder="Email" value={email} onChange={handleChange} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faAt} />
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input className="input" type="password" name="Password" placeholder="Password" value={password} onChange={handleChange} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faKey} />
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <input className="is-checkradio" id="remember" type="checkbox" name="Remember" onChange={handleCheck} />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <div className="field">
                                <button className={"button is-primary is-fullwidth " + (loggingIn ? "is-loading" : "")} type="submit">
                                    {loggingIn ? '' : 'Sign In'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default hot(Lock);