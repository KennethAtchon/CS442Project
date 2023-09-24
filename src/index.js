import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Import the Redux store

import { signInWithToken } from './actions/authActions';

store.dispatch(signInWithToken());

Amplify.configure(awsExports);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}> {/* Wrap your App with Provider */}
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

