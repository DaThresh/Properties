import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';

// Services
import { login, setToken } from '../services/account';

// Utilities
import { apiError } from '../utilities/apiError';
import { capitalize } from '../utilities/format';

function Login(props){
    const { loading, setLoading, changePage } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [message, setMessage] = useState(null);
    const setFunctions = {setEmail, setPassword};

    var submit = (event) => {
        event.preventDefault();
        if(loading) return;
        let token = null;
        setMessage(null);
        setLoading(true);
        login(email, password, remember)
        .then(data => token = data.token)
        .catch(error => apiError(error, {
            400: badCredentials,
            402: requirePayment,
        }))
        .finally(() => {
            setLoading(false)
            if(token) setTimeout(() => setToken(token, remember), 0);
        });

        var badCredentials = (error) => setMessage('Invalid login credentials');
        var requirePayment = (error) => setMessage('Payment required');
    }

    var handleChange = (event) => {
        let setFunction = 'set' + capitalize(event.currentTarget.name);
        if(setFunctions[setFunction]) setFunctions[setFunction](event.currentTarget.value);
    }

    var handleCheck = (event) => setRemember(!remember);

    return (
        <div className="card centered">
            <header className="card-header">
                <p className="card-header-title">
                    Properties
                </p>
            </header>
            <div className="card-content" style={{paddingTop: '10px'}}>
                <h2 className="is-size-3 has-text-weight-semibold has-text-centered">Sign in</h2>
                <h4 className="is-size-6 has-text-centered has-text-danger">{message}</h4>
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
                            <input className="input" type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
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
                        <button className={"button is-primary is-fullwidth" + (loading ? " is-loading" : "")} type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <a className="card-footer-item is-secondary" onClick={changePage} data-page="AccessCode">Have access code?</a>
            </div>
        </div>
    )
}

export default Login;