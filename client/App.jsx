import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Properties from './Properties';
import Settings from './Settings';
import Contacts from './Contacts';
import Lock from './Lock';
import Modal from './Modal';
import Notifications from './Notifications';

// Services
import { getToken, subscribeStatus, unsubscribeStatus } from './services/account';
import { fetchReferenceData } from './services/reference';

function App() {
    const [loggedIn, setLoggedIn] = useState(getToken());

    var handleAccountStatus = (data) => {
        if(data.event === 'login') setLoggedIn(true);
        if(data.event === 'logout') setLoggedIn(false);
    }

    useEffect(() => {
        subscribeStatus(handleAccountStatus);
        return () => unsubscribeStatus(handleAccountStatus);
    })

    useEffect(() => {
        if(!loggedIn) return;
        fetchReferenceData();
    }, []);

    var application = 
        <Router>
            <Sidebar />
            <span id="content">
                <Navbar />
                <section className="section" style={{paddingTop: '24px'}}>
                    <Switch>
                        <Route path="/settings">
                            <Settings />
                        </Route>
                        <Route path="/properties">
                            <Properties />
                        </Route>
                        <Route path="/contacts">
                            <Contacts />
                        </Route>
                        <Route path="/">
                            <Dashboard />
                        </Route>
                    </Switch>
                </section>
            </span>
            <Modal />
            <Notifications />
        </Router>;

    return loggedIn ? application : <Lock />;
}

export default hot(App);