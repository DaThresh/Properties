import { hot } from 'react-hot-loader/root';
import React from 'react';

import Navbar from './Navbar';
import Menu from './Menu';

function App() {
    return (
        <span>
            <Menu />
            <Navbar />
        </span>
    )
}

export default hot(App);