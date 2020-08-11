import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Services
import { subscribe, unsubscribe, isOpen, openSidebar, closeSidebar } from './services/sidebar';
import { logout } from './services/account';

function Navbar(props) {
    const [sidebarOpen, setSidebarOpen] = useState(isOpen());

    var handleSidebarUpdate = data => {
        if(data.event === 'toggle') setSidebarOpen(data.open);
    }

    useEffect(() => {
        subscribe(handleSidebarUpdate);
        return () => unsubscribe(handleSidebarUpdate);
    })

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbar-menu" className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">
                        {sidebarOpen ? 
                            <FontAwesomeIcon icon={faAngleDoubleLeft} onClick={closeSidebar} size="lg" /> :
                            <FontAwesomeIcon icon={faAngleDoubleRight} onClick={openSidebar} size="lg" />
                        }
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <p>Andrew Thresher</p>
                    </div>
                    <div className="navbar-item">
                        <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} size="lg" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default hot(Navbar);