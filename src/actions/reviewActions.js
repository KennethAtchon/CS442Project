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
    API.post('api', '/createReview', {
      body: requestBody,
    })
      .then((response) => {
        console.log(response)
        // Dispatch a success action with the review data
        dispatch({ type: CREATE_REVIEW_SUCCESS });
  
        // Optionally, you can also dispatch other actions or perform additional logic here.
      })
      .catch((error) => {
        // Dispatch a failure action with the error message
        dispatch({ type: CREATE_REVIEW_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });

      });
  };

export const getReview = ({ productId }) => (dispatch) => {
    // Define the request body with productId
    const requestBody = {
      productId,
    };

    console.log(requestBody)
  
    API.post('api', '/getReviews', {
      body: requestBody,
    })
      .then((response) => {
        console.log(response)

        dispatch({ type: GET_REVIEWS_SUCCESS, reviews: response.reviews });

      })
      .catch((error) => {

        dispatch({ type: GET_REVIEWS_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });
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
    productId = parseInt(productId)
  
    return new Promise((resolve, reject) => {
      API.post('api', '/checkReview', {
        body: {
          productId,
          userId,
        }
      })
        .then((response) => {
          console.log(response)
          // Assuming the API response contains a boolean field 'canReview'
          const canReview = response.canReview; // Adjust this according to your API response structure
  
          dispatch({ type: CHECK_REVIEW_SUCCESS, canReview: canReview });
  
          // Resolve the promise with the boolean value
          resolve(canReview);
        })
        .catch((error) => {
          dispatch({ type: CHECK_REVIEW_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });
  
          // Reject the promise with the error
          reject(error);
        });
    });
  };