import React, { useState, useEffect, Fragment } from 'react';
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
import Lock from './Lock/Lock';
import Modal from './Modal';
import Notifications from './Notifications';
import Organizations from './Admin/Organizations';
import Organization from './Admin/Organization';
import NotFound from './NotFound';

// Services
import { getToken, subscribeStatus, unsubscribeStatus } from './services/account';
import { fetchReferenceData, getReferenceData } from './services/reference';

// Utilities
import { apiError } from './utilities/apiError';

function App() {
    const [loggedIn, setLoggedIn] = useState(getToken());
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    if(loggedIn && loading){
        fetchReferenceData()
        .then(() => setLoading(false))
        .catch(error => apiError(error));
    }

    var handleAccountStatus = (data) => {
        if(data.event === 'login') setLoggedIn(true);
        if(data.event === 'logout'){
            setLoggedIn(false);
            setLoading(true);
        }
    }

    useEffect(() => {
        subscribeStatus(handleAccountStatus);
        return () => unsubscribeStatus(handleAccountStatus);
    })

    useEffect(() => {
        if(loading) return;
        setIsAdmin(getReferenceData('admin'));
    }, [loading])

    var application = loading ? null :
        <Router>
            <Sidebar />
            <span id="content">
                <Navbar />
                <section className="section" style={{paddingTop: '24px'}}>
                    <FragmentSupportingSwitch>
                        {isAdmin ? 
                            <Fragment>
                                <Route path="/organizations/:organizationId">
                                    <Organization />
                                </Route>
                                <Route path="/organizations">
                                    <Organizations />
                                </Route>
                            </Fragment>
                        : null}
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
                        <Route path="/" exact>
                            <Dashboard />
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </FragmentSupportingSwitch>
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

// Thanks to @bripkens for the below code
// https://github.com/ReactTraining/react-router/issues/5785#issuecomment-359427800
//
// Default <Switch> does not have support for Fragments, routes must be first level children
function FragmentSupportingSwitch({children}) {
    const flattenedChildren = [];
    flatten(flattenedChildren, children);
    return React.createElement.apply(React, [Switch, null].concat(flattenedChildren));
}
  
function flatten(target, children) {
    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            if (child.type === Fragment) {
                flatten(target, child.props.children);
            } else {
                target.push(child);
            }
        }
    });
}