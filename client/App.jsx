import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Properties from './Properties';
import Settings from './Settings';

function App() {
    return (
        <Router>
            <Sidebar />
            <span id="content">
                <Navbar />
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
            </span>
        </Router>
    )
}

export default hot(App);