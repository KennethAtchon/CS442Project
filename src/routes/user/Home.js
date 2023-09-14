import React from 'react';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component

function Home() {
  return (
    <div>
      <AppNavbar /> 
      <div className="container mt-4">
        <h1>Welcome to Courtside Carts</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam sem nec
          purus ullamcorper, sit amet facilisis erat aliquet. Nulla facilisi.
        </p>
      </div>
    </div>
  );
}

export default Home;
