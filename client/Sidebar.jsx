import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHome, faCog, faUsers, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Services
import { getRole } from './services/account';
import { pushNotification } from './services/notifications';
import { getReferenceData } from './services/reference';

// Utilities
import { apiError } from './utilities/apiError';

function Sidebar(){
    const [showUsers, setShowUsers] = useState(false);

    useEffect(() => {
        var adminRole = getReferenceData('adminRole') ?? 600;
        getRole()
        .then(role => setShowUsers(role > adminRole))
        .catch(error => {
            apiError(error);
            pushNotification('Error', 'Failed to obtain user role', 'danger');
        });
    }, []);

    return (
        <div id="sidebar">
            <div id="sidebar-top">
                <img id="sidebar-brand-logo" src="https://picsum.photos/200" />
                <strong className="sidebar-text">Gramercy Homes</strong>
            </div>
            <Link to ="/">
                <div className="sidebar-item">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faChartLine} size="2x" />
                    </span>
                    <span className="sidebar-text">Dashboard</span>
                </div>
            </Link>
            <Link to ="/properties">
                <div className="sidebar-item">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faHome} size="2x" />
                    </span>
                    <span className="sidebar-text">Properties</span>
                </div>
            </Link>
            <Link to="/contacts">
                <div className="sidebar-item">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faAddressCard} size="2x" />
                    </span>
                    <span className="sidebar-text">Contacts</span>
                </div>
            </Link>
            {showUsers ? (
                <Link to="/users">
                    <div className="sidebar-item">
                        <span className="sidebar-icon">
                            <FontAwesomeIcon icon={faUsers} size="2x" />
                        </span>
                        <span className="sidebar-text">Users</span>
                    </div>
                </Link>
            ) : null}
            <Link to ="/settings">
                <div className="sidebar-item">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faCog} size="2x" />
                    </span>
                    <span className="sidebar-text">Settings</span>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar;