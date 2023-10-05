// redux/store.js
import { configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers/reducers'; // Import your combined reducers
import thunk from 'redux-thunk'; // Import Redux Thunk middleware

const middleware = [thunk];

// Create the store with middleware
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(middleware),
  
});

export default store;
