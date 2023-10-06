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
  GET_ORDER_PRODUCT_SUCCESS,
  SIGN_OUT
} from '../actions/actionTypes';

const initialState = {
  shippingInfo: {},
  paymentInfo: {},
  loading: false,
  error: null,
  orderData: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SHIPPING_INFO_REQUEST:
    case UPDATE_PAYMENT_INFO_REQUEST:
    case CREATE_ORDER_REQUEST:
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

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orderData: {
          date: action.date,
          userId: action.userId,
          total: action.total,
          orderId: action.orderId,
        },
        loading: false,
      };

      case GET_ORDER_PRODUCT_SUCCESS:
        return {
          ...state,
          orderProduct: action.orderproduct,
          loading: false,
        };

    case UPDATE_SHIPPING_INFO_FAILURE:
    case UPDATE_PAYMENT_INFO_FAILURE:
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SIGN_OUT:
      return initialState;

    default:
      return state;
  }
};

export default orderReducer;
