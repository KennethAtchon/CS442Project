// cartReducer.js

import {
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
  REMOVE_CART_ITEMS,
} from '../actions/actionTypes';

// Define the initial state for the cart
const initialState = {
  cart: [], // An array to store cart items
  isLoading: false, // A flag to indicate if a cart update request is in progress
  error: null, // An error message in case of a cart update failure
};

// Define the cart reducer function
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        cart: action.Cart, // Update the cart with the new data
        isLoading: false,
        error: null,
      };
    case UPDATE_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error, // Store the error message in the state
      };
    case REMOVE_CART_ITEMS:
      return {
        ...state,
        cart: [], // Clear the cart when removing items
      };
    default:
      return state;
  }
};

export default cartReducer;
