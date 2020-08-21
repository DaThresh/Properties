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
                <strong className="sidebar-text">Company Name</strong>
            </div>
            <div className="sidebar-item">
                <Link to ="/">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faChartLine} size="2x" />
                    </span>
                    <span className="sidebar-text">Dashboard</span>
                </Link>
            </div>
            <div className="sidebar-item">
                <Link to ="/properties">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faHome} size="2x" />
                    </span>
                    <span className="sidebar-text">Properties</span>
                </Link>
            </div>
            <div className="sidebar-item">
                <Link to ="/settings">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faCog} size="2x" />
                    </span>
                    <span className="sidebar-text">Settings</span>
                </Link>
            </div>
            <div className="sidebar-item">
                <Link to="/contacts">
                    <span className="sidebar-icon">
                        <FontAwesomeIcon icon={faUsers} size="2x" />
                    </span>
                    <span className="sidebar-text">Contacts</span>
                </Link>
            </div>
        </div>
    )
}

export default hot(Sidebar);