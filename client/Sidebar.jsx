import React from 'react';
import { hot } from 'react-hot-loader/root';

function Sidebar(props){
    return (
        <div id="sidebar">
            <div id="sidebar-top">
                <img id="sidebar-brand-logo" src="https://picsum.photos/200" />
                <strong id="sidebar-brand-text">Company Name</strong>
            </div>
        </div>
    )
}

export default hot(Sidebar);