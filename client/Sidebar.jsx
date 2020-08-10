import React from 'react';
import { hot } from 'react-hot-loader/root';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHome, faCog } from '@fortawesome/free-solid-svg-icons';

function Sidebar(props){
    return (
        <div id="sidebar">
            <div id="sidebar-top">
                <img id="sidebar-brand-logo" src="https://picsum.photos/200" />
                <strong className="sidebar-text">Company Name</strong>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-logo">
                    <FontAwesomeIcon icon={faChartLine} size="2x" />
                </span>
                <span className="sidebar-text">Dashboard</span>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-logo">
                    <FontAwesomeIcon icon={faHome} size="2x" />
                </span>
                <span className="sidebar-text">Properties</span>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-logo">
                    <FontAwesomeIcon icon={faCog} size="2x" />
                </span>
                <span className="sidebar-text">Settings</span>
            </div>
        </div>
    )
}

export default hot(Sidebar);