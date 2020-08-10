import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { getToken } from './services/account';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Properties from './Properties';
import Settings from './Settings';
import Lock from './Lock';

function App() {
    var application = 
        <Router>
            <Sidebar />
            <span id="content">
                <Navbar />
                <section className="section">
                    <Switch>
                        <Route path="/settings">
                            <Settings />
                        </Route>
                        <Route path="/properties">
                            <Properties />
                        </Route>
                        <Route path="/">
                            <Dashboard />
                        </Route>
                    </Switch>
                </section>
            </span>
        </Router>;

    return getToken() ? application : <Lock />;
}

export default hot(App);