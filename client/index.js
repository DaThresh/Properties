import 'core-js';
import React from 'react';
import { render } from 'react-dom';

import 'normalize.css';
import './index.css';
import './sass/App.sass';

import App from './App';

const rootElement = document.createElement('div');
rootElement.className = 'root';
document.body.appendChild(rootElement);

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
