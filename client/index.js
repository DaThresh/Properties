import 'core-js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/reducers';

import 'normalize.css';
import './index.css';

import App from './App';

const rootElement = document.createElement('div');
rootElement.className = 'root';
document.body.appendChild(rootElement);

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
