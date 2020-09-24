import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Properties from './Properties/Properties';
import Property from './Properties/Property';
import Settings from './Settings';
import Contacts from './Contacts';
import Users from './Users';
import Lock from './Lock';
import Modal from './Modal';
import Notifications from './Notifications';

// Services
import { getToken, subscribeStatus, unsubscribeStatus } from './services/account';
import { fetchReferenceData } from './services/reference';

// Utilities
import { apiError } from './utilities/apiError';

function App() {
    const [loggedIn, setLoggedIn] = useState(getToken());
    const [loading, setLoading] = useState(true);
    if(loggedIn && loading){
        fetchReferenceData()
        .then(() => setLoading(false))
        .catch(error => apiError(error));
    }

    var handleAccountStatus = (data) => {
        if(data.event === 'login') setLoggedIn(true);
        if(data.event === 'logout') setLoggedIn(false);
    }

    useEffect(() => {
        subscribeStatus(handleAccountStatus);
        return () => unsubscribeStatus(handleAccountStatus);
    })

    var application = loading ? null :
        <Router>
            <Sidebar />
            <span id="content">
                <Navbar />
                <section className="section" style={{paddingTop: '24px'}}>
                    <Switch>
                        <Route path="/settings">
                            <Settings />
                        </Route>
                        <Route path="/properties/:propertyId">
                            <Property />
                        </Route>
                        <Route path="/properties">
                            <Properties />
                        </Route>
                        <Route path="/contacts">
                            <Contacts />
                        </Route>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/">
                            <Dashboard />
                        </Route>
                    </Switch>
                </section>
            </span>
        </Router>;

    return (
        <span>
            {loggedIn ? application : <Lock />}
            {loggedIn && loading ? 
                <section className="hero is-primary is-fullheight"></section>
            : null}
            <div id="pageloader" className={'pageloader ' + (loading && loggedIn ? 'is-active' : '')}>
                <span className="title">Loading...</span>
            </div>
            <Modal />
            <Notifications />
        </span>   
    )
}

export default hot(App);