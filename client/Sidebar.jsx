import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHome, faCog, faUsers, faAddressCard, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Services
import { getReferenceData } from './services/reference';

function Sidebar(){
    const managerRole = getReferenceData('managerRole');
    const isAdmin = getReferenceData('admin');
    const role = getReferenceData('role');
    const showUsers = role >= managerRole;

    return (
        <div id="sidebar">
            <div id="sidebar-top">
                <img id="sidebar-brand-logo" src="https://picsum.photos/200" />
                <strong className="sidebar-text">Gramercy Homes</strong>
            </div>
            {isAdmin ? 
                <Fragment>
                    <Link to="/admin">
                        <div className="sidebar-item">
                            <span className="sidebar-icon">
                                <FontAwesomeIcon icon={faShieldAlt} fixedWidth />
                            </span>
                            <span className="sidebar-text">Test</span>
                        </div>
                    </Link>
                    <hr />
                </Fragment>
            : null}
            <Link to="/">
                <div className="sidebar-item">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faChartLine} fixedWidth />
                    </span>
                    <span className="sidebar-text">Dashboard</span>
                </div>
            </Link>
            <Link to="/properties">
                <div className="sidebar-item">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faHome} fixedWidth />
                    </span>
                    <span className="sidebar-text">Properties</span>
                </div>
            </Link>
            <Link to="/contacts">
                <div className="sidebar-item">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faAddressCard} fixedWidth />
                    </span>
                    <span className="sidebar-text">Contacts</span>
                </div>
            </Link>
            {showUsers ? (
                <Link to="/users">
                    <div className="sidebar-item">
                        <span className="sidebar-icon">
                            <FontAwesomeIcon icon={faUsers} fixedWidth />
                        </span>
                        <span className="sidebar-text">Users</span>
                    </div>
                </Link>
            ) : null}
            <Link to="/settings">
                <div className="sidebar-item">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faCog} fixedWidth />
                    </span>
                    <span className="sidebar-text">Settings</span>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar;