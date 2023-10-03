// redux/store.js

import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducers'; // Import your combined reducers
import thunk from 'redux-thunk'; // Import Redux Thunk middleware

// Create the store with middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Apply Redux Thunk middleware
);

export default store;
