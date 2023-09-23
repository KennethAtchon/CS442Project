// authActions.js
import {
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_OUT,
} from './actionTypes';
import { API } from 'aws-amplify';

// Example async action for signing up
export function signUp(username, email, password) {
    return async (dispatch) => {
        try {
            // Make an API request to sign up using AWS Amplify
            const response = await API.post("api", "/signup", {
                body: {
                    username,
                    email,
                    password,
                },
            });

            const { token } = response;

            localStorage.setItem('authToken', token);

            // Dispatch a success action with the user data
            dispatch({ type: SIGN_UP_SUCCESS, user: response.user }); // Assuming the API response contains user data
        } catch (error) {
            // Dispatch a failure action with the error message
            dispatch({ type: SIGN_UP_FAILURE, error: error.message });
        }
    };
}

// Example async action for signing in
export function signIn(email, password) {
    return async (dispatch) => {
        try {
            // Make an API request to sign in using AWS Amplify
            const response = await API.post("api", "/signin", {
                body: {
                    email,
                    password,
                },
            });

            const { token } = response;

            localStorage.setItem('authToken', token);

            // Dispatch a success action with the user data
            dispatch({ type: SIGN_IN_SUCCESS, user: response.user }); // Assuming the API response contains user data
        } catch (error) {
            // Dispatch a failure action with the error message
            dispatch({ type: SIGN_IN_FAILURE, error: error.message });
        }
    };
}

export function signOut() {
    return (dispatch) => {
        // Clear the authentication token from localStorage
        localStorage.removeItem('authToken');

        // Dispatch a sign-out action if needed (e.g., to reset the user state)
        dispatch({ type: SIGN_OUT });
    };
}

export function signInWithToken() {
    return async (dispatch) => {
      try {
        // Retrieve the authentication token from localStorage
        const authToken = localStorage.getItem('authToken');
  
        if (!authToken) {
          // Token doesn't exist; proceed with regular sign-in or handle the absence of a token
          // You can redirect to the sign-in page or show a welcome message, etc.
          return;
        }
  
        // Make an API request to sign in using the stored token
        const response = await API.post('api', '/signintoken', {
          body: {
            authToken, // Include the authToken in the request body
          },
        });
  
        // Dispatch a success action with the user data
        dispatch({ type: SIGN_IN_SUCCESS, user: response.user });
      } catch (error) {
        // Dispatch a failure action with the error message
        dispatch({ type: SIGN_IN_FAILURE, error: error.message });
      }
    };
  }
