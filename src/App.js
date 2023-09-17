import React from 'react';
import Home from './routes/user/Home';
import Products from './routes/products/productList';
import Faq from './routes/faq/Faq';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/faq" element={<Faq />} />

    </Routes>
  );
}

export default App;


// individual product page -> were user can write reviews under
// reviews page
