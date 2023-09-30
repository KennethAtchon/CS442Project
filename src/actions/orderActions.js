// Import the action types
import {
    UPDATE_SHIPPING_INFO_REQUEST,
    UPDATE_SHIPPING_INFO_SUCCESS,
    UPDATE_SHIPPING_INFO_FAILURE,
    UPDATE_PAYMENT_INFO_REQUEST,
    UPDATE_PAYMENT_INFO_SUCCESS,
    UPDATE_PAYMENT_INFO_FAILURE,
  } from './actionTypes';
import { API } from 'aws-amplify';
  
export const updatePaymentInfo = ({userId, billingInfo, paymentInfo}) => dispatch => {
    dispatch({ type: UPDATE_PAYMENT_INFO_REQUEST });

    if (!userId) {
    // If userId is not provided (for guest users), simply dispatch the success action with the billingInfo and paymentInfo
    dispatch({ type: UPDATE_PAYMENT_INFO_SUCCESS, billingInfo, paymentInfo });
    return Promise.resolve(); // Resolve the promise to indicate success
    }

    // Make an API request to update the user's payment information using AWS Amplify
    API.post('api', '/updatepayment', {
    body: {
        userId,
        billingInfo,
        paymentInfo,
    },
    })
    .then(response => {
        console.log(response);

        // Dispatch a success action indicating that the payment information was updated
        dispatch({ type: UPDATE_PAYMENT_INFO_SUCCESS, billingInfo, paymentInfo });

    })
    .catch(error => {
        // Dispatch a failure action with the error message
        dispatch({ type: UPDATE_PAYMENT_INFO_FAILURE, error });
    });
};


export const updateShippingInfo = ({userId, shippingInfo}) => dispatch => {
    dispatch({ type: UPDATE_SHIPPING_INFO_REQUEST });
  
    if (!userId) {
      // If userId is not provided (for guest users), simply dispatch the success action with the shippingInfo
      dispatch({ type: UPDATE_SHIPPING_INFO_SUCCESS, shippingInfo });
      return Promise.resolve(); // Resolve the promise to indicate success
    }
  
    // Make an API request to update the user's shipping information using AWS Amplify
    API.post('api', '/updateshipping', {
      body: {
        userId,
        shippingInfo,
      },
    })
      .then(response => {
        console.log(response);
  
        // Dispatch a success action indicating that the shipping information was updated
        dispatch({ type: UPDATE_SHIPPING_INFO_SUCCESS, shippingInfo });
  
      })
      .catch(error => {
        // Dispatch a failure action with the error message
        dispatch({ type: UPDATE_SHIPPING_INFO_FAILURE, error });
      });
  };
  