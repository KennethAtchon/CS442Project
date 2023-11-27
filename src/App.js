import React, {useEffect} from 'react';
import Home from './routes/user/Home';
import ForgotPass from './routes/forgotpassword/forgotpass';
import Products from './routes/products/productList';
import ProductsCategory from './routes/products/productCategory';
import UserProduct from './routes/products/userProduct';
import Faq from './routes/faq/Faq';
import Reviews from  './routes/reviews/reviewList';
import ProductPage from './routes/products/productPage';
import OrderConfirm from './routes/checkout/orderConfirm';
import Checkout from './routes/checkout/checkout';
import Error from './routes/error/error'
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // You may need to install react-redux
import { signInWithToken, updateCart} from './actions/authActions';
import { API } from 'aws-amplify';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    //fetchClient();
    //localStorage.clear()
    if(localStorage.getItem('authToken') != null || localStorage.getItem('authToken') != undefined){
      console.log("signing with token")
      dispatch(signInWithToken());
    }
    dispatch(updateCart({userId: undefined}))
    
  })

  async function fetchClient(){
    API
    .get("api", "/", {}).then(response => {
      console.log(`Respone: ${response.success}`)
    })
    .catch(error => {
      console.log("Testing : " + error);
    })
}

  return (
<div style={{ backgroundImage: "url(images/background.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover }}>
</div>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/resetpassword/:email/:token" element={<ForgotPass />} />
      <Route path="/products/category/:category" element={<ProductsCategory />} />
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

