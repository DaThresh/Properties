import 'core-js';
import React from 'react';
import { render } from 'react-dom';

import './sass/App.sass';
import './sass/Sidebar.scss';
import './sass/Content.scss';
import './sass/Navbar.scss';
import './sass/Modal.scss';
import './sass/Lock.scss';
import './sass/SetProperty.scss';

import App from './App';

const rootElement = document.createElement('div');
rootElement.className = 'root';
document.body.appendChild(rootElement);

render(<App />, rootElement);