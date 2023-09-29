// productReducer.js
import {
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    products: [], // Initial state for products
    loading: false, // Indicates whether the request is in progress
    error: null, // Stores any error message
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: action.products,
        };
      case GET_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  