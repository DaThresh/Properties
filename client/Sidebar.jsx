import React from 'react';
import { hot } from 'react-hot-loader/root';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHome, faCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Sidebar(props){
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
            <Link to ="/settings">
                <div className="sidebar-item">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faCog} size="2x" />
                    </span>
                    <span className="sidebar-text">Settings</span>
                </div>
            </Link>
            <Link to="/contacts">
                <div className="sidebar-item">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faUsers} size="2x" />
                    </span>
                    <span className="sidebar-text">Contacts</span>
                </div>
            </Link>
        </div>
    )
}

export default hot(Sidebar);