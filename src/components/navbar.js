import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import { BsFillPersonFill, BsCart2 } from 'react-icons/bs'; // Import the icon you want to use for the profile icon
import SignInModal from './auth/signinModal';
import SignUpModal from './auth/signupModal';
import ForgotPasswordModal from './auth/forgotpassModal'; // Import the ForgotPasswordModal component
import ShoppingCartModal from './modals/cartModal'
import SettingsModal from './modals/settingsModal'; 
import SearchBar from './searchbar'
import './navbar.css'


function AppNavbar() {
    const [loggedIn, setLoggedIn] = useState(true); // Assuming you have a way to track login status

    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // Add state for the forgot password modal
    const [showShoppingCartModal, setShowShoppingCartModal] = useState(false); // Add state for the shopping cart modal
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [cartItems, setCartItems] = useState([
      {
        image: 'football.jpg',
        name: 'Product 1',
        price: 10.99,
        quantity: 2,
      },
      {
        image: 'football.jpg',
        name: 'Product 2',
        price: 19.99,
        quantity: 1,
      },
      {
        image: 'football.jpg',
        name: 'Product 2',
        price: 19.99,
        quantity: 1,
      },
      {
        image: 'football.jpg',
        name: 'Product 2',
        price: 19.99,
        quantity: 1,
      },
      {
        image: 'football.jpg',
        name: 'Product 2',
        price: 19.99,
        quantity: 1,
      },
    ]);

    const handleSignIn = () =>{
    setShowSignInModal(true);
    }

    const handleSignInModalClose = () => {
      setShowSignInModal(false);
    };

    const handleSignUp = () => {
      setShowSignUpModal(true); // Use the same variable for the signup modal
    };
    const handleSignUpModalClose = () => {
      setShowSignUpModal(false); // Use the same variable for closing the signup modal
    };

    const handleForgotPassword = () => {
      setShowForgotPasswordModal(true); // Function to open the forgot password modal
    };
  
    const handleForgotPasswordModalClose = () => {
      setShowForgotPasswordModal(false); // Function to close the forgot password modal
    };

    const handleShoppingCart = () => {
      setShowShoppingCartModal(true);
    };
  
    // Function to close the shopping cart modal
    const handleShoppingCartModalClose = () => {
      setShowShoppingCartModal(false);
    };

    const handleSettings = () => {
      setShowSettingsModal(true); // Open the settings modal when "Change Settings" is clicked
    };
  
    const handleSettingsModalClose = () => {
      setShowSettingsModal(false); // Close the settings modal
    };

    const handleLogout = () => {

    }
  
    return (
      <div>
      <Navbar bg='light' expand="lg">
        <Navbar.Brand>
        <Link to="/home" className='linkunderline'>Courtside Carts</Link>
        </Navbar.Brand> 
        
        <SearchBar className="navbarsearchbar" /> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />  
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" >
            <Link to="/" className="navlink">
              Home
            </Link>
            <Link to="/faq" className="navlink">
              FAQ
            </Link>
          </Nav>
          {loggedIn ? (
            <Nav>
              <NavDropdown title={<BsFillPersonFill style={{ marginLeft: '10px', fontSize: '20px'}} />} id="basic-nav-dropdown">

              <NavDropdown.Item>
              <Link to="/myproducts" className='linkunderline'>
                My Products
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/myreviews" className='linkunderline'>
                My Reviews
              </Link>
            </NavDropdown.Item>

                <NavDropdown.Item onClick={handleSettings}>Change Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>

              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <BsFillPersonFill color='black' style={{ marginLeft: '10px', fontSize: '20px', marginRight:'20px'}} onClick={handleSignIn} />
            </Nav>

          )}
          <BsCart2 style={{ marginLeft: '10px' , fontSize: '20px' }} onClick={handleShoppingCart} />

        </Navbar.Collapse>
      </Navbar>

      <SignInModal show={showSignInModal} onHide={handleSignInModalClose} signupfunction={handleSignUp}forgotpassfunction={handleForgotPassword} />

      <SignUpModal  show={showSignUpModal} onHide={handleSignUpModalClose} signinfunction={handleSignIn} forgotpassfunction={handleForgotPassword} />

      <ForgotPasswordModal show={showForgotPasswordModal} onHide={handleForgotPasswordModalClose} signinfunction={handleSignIn} signupfunction={handleSignUp} />

      <ShoppingCartModal
        show={showShoppingCartModal}
        onHide={handleShoppingCartModalClose}
        cartItems={cartItems}
      />

      <SettingsModal show={showSettingsModal} onHide={handleSettingsModalClose} />

      <div className="navbar-separator-bar"></div>

      <Navbar bg="light"  className="mini-navbar">
        <Nav className="mx-auto">
          <Link to="/products" className="nav-category">
            Basketball
          </Link>
          <Link to="/products" className="nav-category">
            Soccer
          </Link>
          <Link to="/products" className="nav-category">
            Tennis
          </Link>
          <Link to="/products" className="nav-category">
            Swimming
          </Link>
          <Link to="/products" className="nav-category">
            Football
          </Link>
          <Link to="/products" className="nav-category">
            Fishing
          </Link>
          
        </Nav>
      </Navbar>

      <div className="navbar-separator-bar"></div>

      </div>
    );
  }
  
  export default AppNavbar;
  