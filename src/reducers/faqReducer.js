import { GET_FAQ_SUCCESS, GET_FAQ_FAILURE } from '../actions/actionTypes';

// Initial state for the FAQ data
const initialState = {
  faq: [], // You can initialize it as an empty array or null, depending on your preference
  error: null,
};

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAQ_SUCCESS:
      return {
        ...state,
        faq: action.faq, // Update the FAQ data with the received data
        error: null,     // Clear any previous error
      };
    case GET_FAQ_FAILURE:
      return {
        ...state,
        faq: [],              // Clear the FAQ data on failure
        error: action.error,  // Set the error message
      };
    default:
      return state;
  }
};

export default faqReducer;
