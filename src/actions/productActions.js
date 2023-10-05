// productActions.js
import {
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE,
  } from './actionTypes';
  import { API } from 'aws-amplify';
  
  // Action to fetch products based on criteria
  export const getProduct = ({category, features, rating, price, description,
     name, product_id, supplier_name, supplier_address, delivery_speed}) => (dispatch) => {
    dispatch({ type: GET_PRODUCT_REQUEST });
  
    // Define your API request with the specified criteria
    const request = {
      category,
      features,
      rating,
      price,
      description,
      name,
      product_id,
      supplier_name,
      supplier_address,
      delivery_speed,
    };

    // Make an API request to fetch products using AWS Amplify
    API.post('api', '/getProducts', {
      body: request,
    })
      .then((response) => {
        // Dispatch a success action with the fetched products
        dispatch({ type: GET_PRODUCT_SUCCESS, products: response.products }); // Assuming the API response contains products
  
      })
      .catch((error) => {
        // Dispatch a failure action with the error message
        dispatch({ type: GET_PRODUCT_FAILURE, error: "An Error occured with the API, check AWS to resolve." });

      });
  };

  export const getUserProduct = ({userId}) => (dispatch) => {
   dispatch({ type: GET_PRODUCT_REQUEST });
 
   // Define your API request with the specified criteria
   const request = {
     userId
   };


   if (userId === null || userId === undefined) {
    console.log("null value for userid")
    return;
  }

  
   // Make an API request to fetch products using AWS Amplify
   API.post('api', '/getUserProducts', {
     body: request,
   })
     .then((response) => {
       // Dispatch a success action with the fetched products
       dispatch({ type: GET_PRODUCT_SUCCESS, products: response.products }); // Assuming the API response contains products
 
     })
     .catch((error) => {
       // Dispatch a failure action with the error message
       dispatch({ type: GET_PRODUCT_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });
       
     });
 };
 