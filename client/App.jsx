import React from 'react';
import { hot } from 'react-hot-loader/root';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

function App() {
    return (
        <span>
            <Sidebar />
            <span id="content">
                <Navbar />
            </span>
        </span>
    )
}

export default hot(App);