import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import { BsFillPersonFill } from 'react-icons/bs'; // Import the icon you want to use for the profile icon
import './navbar.css'


function AppNavbar() {
    const [loggedIn, setLoggedIn] = useState(true); // Assuming you have a way to track login status
  
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Courtside Carts</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/faq" className="nav-link">
              FAQ
            </Link>
          </Nav>
          {loggedIn ? (
            <Nav>
              <NavDropdown title={<BsFillPersonFill />} id="basic-nav-dropdown">
                <NavDropdown.Item href="#my-products">My Products</NavDropdown.Item>
                <NavDropdown.Item href="#my-reviews">My Reviews</NavDropdown.Item>
                <NavDropdown.Item href="#change-settings">Change Settings</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Button variant="primary">Login</Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
  
  export default AppNavbar;
  