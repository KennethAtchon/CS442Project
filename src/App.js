import React from 'react';
import Home from './routes/user/Home'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (

    <Routes>
      
      <Route path="/" element={ < Home /> } />
      
    </Routes>

  );
}

// home page -> options to sign in or log in or stay as guest
// maybe home page shows recently purchased items
// maybe a tabbar containing the different products and current products
// products page -> will be same if they search or clicked on a tab bar category
// individual product page -> were user can write reviews under
// reviews page
// FAQ page

export default App;
