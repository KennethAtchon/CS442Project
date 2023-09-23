// reducers.js
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Import your authReducer

const rootReducer = combineReducers({
  auth: authReducer, // Add authReducer to the root reducer
  // Add other reducers here if needed
});

export default rootReducer;
