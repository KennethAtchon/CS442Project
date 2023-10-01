import { API } from 'aws-amplify';
import {
  CREATE_REVIEW_FAILURE,
  CREATE_REVIEW_SUCCESS,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE, 
  CHECK_REVIEW_SUCCESS,
  CHECK_REVIEW_FAILURE
} from './actionTypes';

// Create the review action
export const createReview = ({ userId, productId, reviewText, rating, date }) => (dispatch) => {
    // Define the request body with productId and reviewText
    const requestBody = {
      productId,
      userId,
      reviewText,
      rating,
      date
    };
  
    // Make an API request using Amplify's API.post
    API.post('api', '/createreview', {
      body: requestBody,
    })
      .then((response) => {
        // Dispatch a success action with the review data
        dispatch({ type: CREATE_REVIEW_SUCCESS, review: response.review });
  
        // Optionally, you can also dispatch other actions or perform additional logic here.
      })
      .catch((error) => {
        // Dispatch a failure action with the error message
        dispatch({ type: CREATE_REVIEW_FAILURE, error });
  
        // Optionally, you can also dispatch other actions or perform additional error handling here.
      });
  };

export const getReview = ({ productId }) => (dispatch) => {
    // Define the request body with productId
    const requestBody = {
      productId,
    };
  
    API.post('api', '/getreviews', {
      body: requestBody,
    })
      .then((response) => {
        // Dispatch a success action with the review data
        console.log(response)

        dispatch({ type: GET_REVIEWS_SUCCESS, reviews: response.reviews });


  
        // Optionally, you can also dispatch other actions or perform additional logic here.
      })
      .catch((error) => {
        // Dispatch a failure action with the error message
        dispatch({ type: GET_REVIEWS_FAILURE, error });
  
        // Optionally, you can also dispatch other actions or perform additional error handling here.
      });
  };

export const checkReview = ({ productId, userId }) => (dispatch) => {
    // Define the request body with productId and userId
    const requestBody = {
      productId,
      userId,
    };
  
    return new Promise((resolve, reject) => {
      API.post('api', '/checkreview', {
        body: requestBody,
      })
        .then((response) => {
          // Assuming the API response contains a boolean field 'canReview'
          const canReview = response.canReview; // Adjust this according to your API response structure
  
          dispatch({ type: CHECK_REVIEW_SUCCESS, canReview });
  
          // Resolve the promise with the boolean value
          resolve(canReview);
        })
        .catch((error) => {
          dispatch({ type: CHECK_REVIEW_FAILURE, error });
  
          // Reject the promise with the error
          reject(error);
        });
    });
  };