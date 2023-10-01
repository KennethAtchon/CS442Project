// actionTypes.js
// Define action types as constants

// Authentication related action types
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_OUT = 'SIGN_OUT';

// Product related action types
export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

// Add more action types for other parts of your application as needed
export const UPDATE_CART_REQUEST = 'UPDATE_CART_REQUEST';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';
export const UPDATE_CART_FAILURE = 'UPDATE_CART_FAILURE';
export const REMOVE_CART_ITEMS = 'REMOVE_CART_ITEMS';

export const UPDATE_SHIPPING_INFO_REQUEST = 'UPDATE_SHIPPING_INFO_REQUEST';
export const UPDATE_SHIPPING_INFO_SUCCESS = 'UPDATE_SHIPPING_INFO_SUCCESS';
export const UPDATE_SHIPPING_INFO_FAILURE = 'UPDATE_SHIPPING_INFO_FAILURE';

export const UPDATE_PAYMENT_INFO_REQUEST = 'UPDATE_PAYMENT_INFO_REQUEST';
export const UPDATE_PAYMENT_INFO_SUCCESS = 'UPDATE_PAYMENT_INFO_SUCCESS';
export const UPDATE_PAYMENT_INFO_FAILURE = 'UPDATE_PAYMENT_INFO_FAILURE';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

export const GET_ORDER_PRODUCT_SUCCESS = 'GET_ORDER_PRODUCT_SUCCESS';
