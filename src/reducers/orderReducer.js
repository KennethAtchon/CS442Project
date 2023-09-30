import {
    UPDATE_SHIPPING_INFO_REQUEST,
    UPDATE_SHIPPING_INFO_SUCCESS,
    UPDATE_SHIPPING_INFO_FAILURE,
    UPDATE_PAYMENT_INFO_REQUEST,
    UPDATE_PAYMENT_INFO_SUCCESS,
    UPDATE_PAYMENT_INFO_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    shippingInfo: {},
    paymentInfo: {},
    loading: false,
    error: null,
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_SHIPPING_INFO_REQUEST:
      case UPDATE_PAYMENT_INFO_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case UPDATE_SHIPPING_INFO_SUCCESS:
        return {
          ...state,
          shippingInfo: action.shippingInfo,
          loading: false,
        };
  
      case UPDATE_PAYMENT_INFO_SUCCESS:
        return {
          ...state,
          paymentInfo: {
            billingInfo: action.billingInfo,
            paymentInfo: action.paymentInfo,
          },
          loading: false,
        };
  
      case UPDATE_SHIPPING_INFO_FAILURE:
      case UPDATE_PAYMENT_INFO_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      default:
        return state;
    }
  };
  
  export default orderReducer;
  