import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft, faSignOutAlt, faBell, faAddressCard, faHome, faChartLine, faCog, faUsers, faBuilding } from '@fortawesome/free-solid-svg-icons';

// Services
import { subscribe, unsubscribe, isOpen, openSidebar, closeSidebar } from './services/sidebar';
import { getReferenceData } from './services/reference';
import { logout } from './services/account';

function Navbar() {
    const organization = getReferenceData('organization');
    const userName = getReferenceData('userName');
    const managerRole = getReferenceData('managerRole');
    const role = getReferenceData('role');
    const isManager = role >= managerRole;
    const isAdmin = getReferenceData('admin');
    const mobileMenu = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(isOpen());

    var handleSidebarUpdate = data => {
        if(data.event === 'toggle') setSidebarOpen(data.open);
    }

    var toggleNav = () => {
        let current = mobileMenu.current.style.visibility;
        mobileMenu.current.style.visibility = (current == 'visible' ? 'hidden' : 'visible');
    }

    useEffect(() => {
        subscribe(handleSidebarUpdate);
        return () => unsubscribe(handleSidebarUpdate);
    })

    return (
        <Fragment>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item is-hidden-tablet">
                        <img className="organization-logo" src={organization?.images?.profilePicture} />
                    </div>
                    <div className="navbar-item is-hidden-tablet pl-0">
                        {organization?.name}
                    </div>
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" onClick={toggleNav}>
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
                            <p>{userName}</p>
                        </div>
                        <div className="navbar-item">
                            <FontAwesomeIcon icon={faBell} />
                        </div>
                        <div className="navbar-item">
                            <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} size="lg" />
                        </div>
                    </div>
                </div>
            </nav>
            <div id="mobile-menu" ref={mobileMenu}>
                {isAdmin ?
                    <Link onClick={toggleNav} className="mobile-menu-line" to="/organizations">
                        <p className="mobile-menu-name">Organizations</p>
                        <span className="icon">
                            <FontAwesomeIcon icon={faBuilding} />
                        </span>
                    </Link>
                : null}
                <Link onClick={toggleNav} className="mobile-menu-line" to="/">
                    <p className="mobile-menu-name">Dashboard</p>
                    <span className="icon">
                        <FontAwesomeIcon icon={faChartLine} />
                    </span>
                </Link>
                <Link onClick={toggleNav} className="mobile-menu-line" to="/properties">
                    <p className="mobile-menu-name">Properties</p>
                    <span className="icon">
                        <FontAwesomeIcon icon={faHome} />
                    </span>
                </Link>
                <Link onClick={toggleNav} className="mobile-menu-line" to="/contacts">
                    <p className="mobile-menu-name">Contacts</p>
                    <span className="icon">
                        <FontAwesomeIcon icon={faAddressCard} />
                    </span>
                </Link>
                {isManager ?
                    <Link onClick={toggleNav} className="mobile-menu-line" to="/users">
                        <p className="mobile-menu-name">Users</p>
                        <span className="icon">
                            <FontAwesomeIcon icon={faUsers} />
                        </span>
                    </Link>
                : null}
                <Link onClick={toggleNav} className="mobile-menu-line" to="/settings">
                    <p className="mobile-menu-name">Settings</p>
                    <span className="icon">
                        <FontAwesomeIcon icon={faCog} />
                    </span>
                </Link>
            </div>
        </Fragment>
    )
}

export default Navbar;