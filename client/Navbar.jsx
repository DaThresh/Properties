import { hot } from 'react-hot-loader/root';
import React from 'react';

function Navbar(props) {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" dataTarget="navbar-menu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbar-menu" className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <p>Andrew</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default hot(Navbar);