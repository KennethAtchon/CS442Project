// Import the action types
import {
    UPDATE_SHIPPING_INFO_REQUEST,
    UPDATE_SHIPPING_INFO_SUCCESS,
    UPDATE_SHIPPING_INFO_FAILURE,
    UPDATE_PAYMENT_INFO_REQUEST,
    UPDATE_PAYMENT_INFO_SUCCESS,
    UPDATE_PAYMENT_INFO_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_FAILURE,
    GET_ORDER_PRODUCT_SUCCESS
  } from './actionTypes';
import { API } from 'aws-amplify';

export const OrderProductLink = ({ orderid, cartItems }) => (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  return new Promise((resolve, reject) => {
      API.post('api', '/orderproduct', {
        body: {
          orderid,
          cartItems,
        },
      })
        .then((response) => {

          resolve(response);
        })
        .catch((error) => {


          reject(error); // Reject the promise with the error
        });
    }
  )};

export const getOrderProduct = ({ orderId }) => (dispatch) =>{
  API.post('api', '/getorderproduct',{
    body: {
      orderId
    }
  }).then((response) => {
    
    dispatch({ type: GET_ORDER_PRODUCT_SUCCESS, orderproduct: response.order});

  })
  .catch((error) => {
    // Dispatch a failure action with the error message

    dispatch({ type: CREATE_ORDER_FAILURE, error });

  });
}

export const getOrder = ({ orderId}) => (dispatch) =>{

  API.post('api', '/getorder',{
    body: {
       orderId
    }
  }).then((response) => {
    const order = response.order
    const { order_date, order_id, total_price, user_id} = order[0]

    dispatch({ type: CREATE_ORDER_SUCCESS, date: order_date, userId: user_id, total: total_price, orderId: order_id});

  })
  .catch((error) => {
    // Dispatch a failure action with the error message

    dispatch({ type: CREATE_ORDER_FAILURE, error });

  });
}



// Define the action creator for creating an order
export const createOrder = ({ date, userId, total }) => (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  return new Promise((resolve, reject) => {
    API.post('api', '/createorder', {
      body: {
        date,
        userId,
        total,
      },
    })
      .then((response) => {
        const orderid = response.results.insertId;

        // Dispatch a success action indicating that the order was created
        dispatch({ type: CREATE_ORDER_SUCCESS, date, userId, total, orderid});

        resolve(orderid);
      })
      .catch((error) => {
        // Dispatch a failure action with the error message
        dispatch({ type: CREATE_ORDER_FAILURE, error });

        reject(error); // Reject the promise with the error
      });
  });
};



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
  