import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import { BsFillPersonFill } from 'react-icons/bs'; // Import the icon you want to use for the profile icon
import SearchBar from './searchbar'
import './navbar.css'


function AppNavbar() {
    const [loggedIn, setLoggedIn] = useState(true); // Assuming you have a way to track login status
  
    return (
      <div>
      <Navbar bg='light' expand="lg">
        <Navbar.Brand href="#home">Courtside Carts</Navbar.Brand> 
        <SearchBar className="navbar-search-bar" /> 
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
              <NavDropdown title={<BsFillPersonFill style={{ marginLeft: '10px'}} />} id="basic-nav-dropdown">
                <NavDropdown.Item href="#my-products">My Products</NavDropdown.Item>
                <NavDropdown.Item href="#my-reviews">My Reviews</NavDropdown.Item>
                <NavDropdown.Item href="#change-settings">Change Settings</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Link to="/login">
              <BsFillPersonFill color='black' style={{ marginLeft: '10px'}}  />
            </Link>
          )}
        </Navbar.Collapse>
      </Navbar>

      <div className="navbar-separator-bar"></div>

      <Navbar bg="light"  className="mini-navbar">
        <Nav className="mx-auto">
          <Link to="/" className="nav-category">
            Basketball
          </Link>
          <Link to="/" className="nav-category">
            Soccer
          </Link>
          <Link to="/" className="nav-category">
            Tennis
          </Link>
          <Link to="/" className="nav-category">
            Swimming
          </Link>
          <Link to="/" className="nav-category">
            Football
          </Link>
          <Link to="/" className="nav-category">
            Fishing
          </Link>
          
        </Nav>
      </Navbar>

      <div className="navbar-separator-bar"></div>

      </div>
    );
  }
  
  export default AppNavbar;
  