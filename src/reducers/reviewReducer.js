import {
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  CHECK_REVIEW_SUCCESS,
  CHECK_REVIEW_FAILURE
} from '../actions/actionTypes';

// Define an initial state for reviews
const initialState = {
  reviews: [],
  error: null,
  canReview: false, // Add a new field to track whether the user can review
};

// Define the review reducer function
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.review], // Add the new review to the state
        error: null, // Clear any previous errors
      };

    case CREATE_REVIEW_FAILURE:
      return {
        ...state,
        error: action.error, // Set the error message
      };

    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.reviews, // Set the reviews from the API response
        error: null, // Clear any previous errors
      };

    case GET_REVIEWS_FAILURE:
      return {
        ...state,
        error: action.error, // Set the error message
      };

    case CHECK_REVIEW_SUCCESS:
      return {
        ...state,
        canReview: action.canReview, // Set whether the user can review
        error: null, // Clear any previous errors
      };

    case CHECK_REVIEW_FAILURE:
      return {
        ...state,
        error: action.error, // Set the error message
      };

    default:
      return state;
  }
};

export default reviewReducer;
