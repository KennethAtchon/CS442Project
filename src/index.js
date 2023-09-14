import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import { BrowserRouter } from 'react-router-dom';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>

);