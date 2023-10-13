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
  return new Promise((resolve, reject) => {
    // Define the request body with productId and reviewText
    const requestBody = {
      productId,
      userId,
      reviewText,
      rating,
      date
    };

    // Make an API request using Amplify's API.post
    API.post('api', '/createReview', {
      body: requestBody,
    })
      .then((response) => {
        console.log(response);
        // Dispatch a success action with the review data
        dispatch({ type: CREATE_REVIEW_SUCCESS });

        // Optionally, you can also dispatch other actions or perform additional logic here.
        resolve(); // Resolve the Promise when the API call is successful.
      })
      .catch((error) => {
        // Dispatch a failure action with the error message
        dispatch({ type: CREATE_REVIEW_FAILURE, error: "An Error occurred with the API, check AWS to resolve." });
        reject(error); // Reject the Promise when the API call fails.
      });
  });
};


  export const getReview = ({ productId }) => (dispatch) => {
    // Define the request body with productId
    const requestBody = {
      productId,
    };
  
    console.log(requestBody);
  
    return new Promise((resolve, reject) => {
      API.post('api', '/getReviews', {
        body: requestBody,
      })
        .then((response) => {
          console.log(response);
  
          dispatch({ type: GET_REVIEWS_SUCCESS, reviews: response.reviews });
          resolve(response.reviews); // Resolve the promise with response.reviews
        })
        .catch((error) => {
          dispatch({ type: GET_REVIEWS_FAILURE, error: "An Error occurred with the API, check AWS to resolve." });
          reject(error); // Reject the promise with the error
        });
    });
  };
  

  export const getUserReview = ({ userId }) => (dispatch) => {

    const requestBody = {
      userId,
    };
  
    API.post('api', '/getUserReviews', {
      body: requestBody,
    })
      .then((response) => {
        // Dispatch a success action with the review data
        console.log(response)

        dispatch({ type: GET_REVIEWS_SUCCESS, reviews: response.reviews });

      })
      .catch((error) => {

        dispatch({ type: GET_REVIEWS_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });
      });
  };

  export const checkReview = ({ productId, userId }) => (dispatch) => {
    // Define the request body with productId and userId
    productId = parseInt(productId);
  
    return new Promise((resolve, reject) => {
      API.post('api', '/checkReview', {
        body: {
          productId,
          userId,
        }
      })
        .then((response) => {
          console.log(response);
          // Assuming the API response contains a boolean field 'canReview'
          const canReview = response.canReview; // Adjust this according to your API response structure
  
          dispatch({ type: CHECK_REVIEW_SUCCESS, canReview: canReview });
  
          resolve(canReview); // Resolve the promise with the canReview value
        })
        .catch((error) => {
          dispatch({ type: CHECK_REVIEW_FAILURE, error: "An Error occurred with the API, check AWS to resolve." });
          reject(error); // Reject the promise with the error
        });
    });
  };
  