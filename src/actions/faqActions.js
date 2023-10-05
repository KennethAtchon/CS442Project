import { API } from 'aws-amplify';
import {
    GET_FAQ_SUCCESS,  
    GET_FAQ_FAILURE   
  } from './actionTypes';
  

export const getFAQ = () => (dispatch) => {
    // You may need to adjust the API endpoint and request configuration based on your backend setup.
    API.get('api', '/getFaq')
      .then((response) => {
        // Dispatch a success action with the FAQ data
        console.log(response);
  
        dispatch({ type: GET_FAQ_SUCCESS, faq: response.faq });
  
        // Optionally, you can also dispatch other actions or perform additional logic here.
      })
      .catch((error) => {
        // Dispatch a failure action with the error message
        dispatch({ type: GET_FAQ_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });
  
        // Optionally, you can also dispatch other actions or perform additional error handling here.
      });
  };
  