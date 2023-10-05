// authActions.js
import {
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_OUT,
    UPDATE_CART_REQUEST,
    UPDATE_CART_SUCCESS,
    UPDATE_CART_FAILURE,
    REMOVE_CART_ITEMS,
} from './actionTypes';
import { API } from 'aws-amplify';


// Example async action for signing up
export const  signUp = (name, email, password) => dispatch => {
    return new Promise((resolve, reject) => {
        // Make an API request to sign up using AWS Amplify
        API.post("api", "/signUp", {
            body: {
                name,
                email,
                password,
            },
        })
        .then((response) => {
            console.log(response)
            const { token } = response;

            localStorage.setItem('authToken', token);

            // Dispatch a success action with the user data
            dispatch({ type: SIGN_UP_SUCCESS, user: response.user[0] }); // Assuming the API response contains user data
            
            localStorage.setItem('cartItems', response.user[0].cart);
            dispatch({ type: UPDATE_CART_SUCCESS, Cart: JSON.parse( response.user[0].cart)});
            // Resolve the promise to indicate success
            resolve();
        })
        .catch((error) => {
            // Dispatch a failure action with the error message
            dispatch({ type: SIGN_UP_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });

            // Reject the promise to indicate an error
            reject(error);
        });
    });
}


export const changeSettings = ({ userId, name, email, currentpassword, password }) => (dispatch) => {


    // Create the request body with the relevant data from the current state or parameters
    const requestBody = {
        userId,
        name,
        email,
        currentpassword,
        password,
        // Add other relevant data from the current state here if needed
    };

    // Make the API request to change user settings
    API.post("api", "/changeSettings", {
        body: requestBody,
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log("error big bad: " + error)
    });
};



// Example async action for signing in
export const signIn = (email, password) => dispatch => {
    return new Promise((resolve, reject) => {
        // Make an API request to sign in using AWS Amplify
        API.post("api", "/signIn", {
            body: {
                email,
                password,
            },
        })
        .then((response) => {

            const { token } = response;

            localStorage.setItem('authToken', token);

            // Dispatch a success action with the user data
            dispatch({ type: SIGN_IN_SUCCESS, user: response.user }); // Assuming the API response contains user data
            
            localStorage.setItem('cartItems', response.user.cart);
            dispatch({ type: UPDATE_CART_SUCCESS, Cart:  JSON.parse(response.user.cart)});


            // Resolve the promise to indicate success
            resolve();
        })
        .catch((error) => {
            // Dispatch a failure action with the error message
            dispatch({ type: SIGN_IN_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });

            // Reject the promise to indicate an error
            reject(error);
        });
    });
}


export const signOut = () => (dispatch) => {
    // Clear the authentication token from localStorage
    localStorage.removeItem('authToken');

    localStorage.removeItem('cartItems');
    dispatch({ type: REMOVE_CART_ITEMS });

    // Dispatch a sign-out action if needed (e.g., to reset the user state)
    dispatch({ type: SIGN_OUT });
};


export const signInWithToken = () => async (dispatch) => {
    try {
        // Retrieve the authentication token from localStorage
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            // Token doesn't exist; proceed with regular sign-in or handle the absence of a token
            // You can redirect to the sign-in page or show a welcome message, etc.
            return;
        }
        

        // Make an API request to sign in using the stored token
        const response = await API.post('api', '/signIntoken', {
            body: {
                token: authToken // Include the authToken in the request body
            },
        });

        // Dispatch a success action with the user data
        
        dispatch({ type: SIGN_IN_SUCCESS, user: response.decoded.user });
        localStorage.setItem('cartItems', response.decoded.user.cart);
        dispatch({ type: UPDATE_CART_SUCCESS, Cart:  JSON.parse(response.decoded.user.cart)});

    } catch (error) {
        // Dispatch a failure action with the error message
        
        dispatch({ type: SIGN_IN_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });
    }
};

export const updateCart = ({userId, cartData, removeIndex}) => dispatch => {

    dispatch({ type: UPDATE_CART_REQUEST });
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];


    if(cartData){
        const existingItemIndex = cart.findIndex(item => item.product_id === cartData.product_id);

        if (existingItemIndex >= 0) {
            // If the item already exists in the cart, update its quantity or perform other actions as needed
            // For example, you can update the quantity:
            cart[existingItemIndex].quantity += cartData.quantity;
        } else{
            // If the item is not in the cart, add it
            cart.push(cartData);
        }
    }

    if(removeIndex !== undefined){
        if(removeIndex === 0){
            cart.shift();
        }else{
            cart.splice(removeIndex, 1);
        }
        
    }


    if (!userId) {
        // If userId is not provided, simply dispatch the success action with the cart data
        dispatch({ type: UPDATE_CART_SUCCESS, Cart: cart });
        localStorage.setItem('cartItems', JSON.stringify(cart));
        return Promise.resolve(); // Resolve the promise to indicate success
      }
  
      // Make an API request to update the user's cart using AWS Amplify
    API.post('api', '/updateCart', {
        body: {
        userId,
        cart,
        },
        })
        .then(response => {
        console.log(response)

        localStorage.setItem('cartItems', JSON.stringify(cart));
        // Dispatch a success action indicating that the cart was updated
        dispatch({ type: UPDATE_CART_SUCCESS, Cart: cart });


        })
        .catch(error => {
        // Dispatch a failure action with the error message
        dispatch({ type: UPDATE_CART_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });


    });
  };

