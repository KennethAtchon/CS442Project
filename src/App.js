import React from 'react';
import Home from './routes/user/Home';
import Products from './routes/products/productList';
import UserProduct from './routes/products/userProduct';
import Faq from './routes/faq/Faq';
import Reviews from  './routes/reviews/reviewList';
import ProductPage from './routes/products/productPage';
import OrderConfirm from './routes/checkout/orderConfirm';
import Checkout from './routes/checkout/checkout';
import Error from './routes/error/error'
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/myproducts" element={<UserProduct />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/myreviews" element={< Reviews />} />

      <Route path="/product/:id" element={ < ProductPage /> } />
      <Route path="/checkout" element={ < Checkout /> } />
      <Route path="/checkout/:orderid" element={ < OrderConfirm /> } />
      <Route path="/error" element={ < Error /> } />

    </Routes>
  );
}

export default App;


// individual product page -> were user can write reviews under
// reviews page
