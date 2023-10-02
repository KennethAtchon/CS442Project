import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import AppNavbar from '../../components/navbar';
import ProductCard from '../../components/productcard';
import { useNavigate } from 'react-router-dom';
import { getUserProduct } from '../../actions/productActions'; 
import './productList.css';


const userProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch function
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user);

  
  useEffect(() => {

    if(!user){
      navigate('/error')
    }

    dispatch(getUserProduct({userId: user ? user.user_id : undefined}));
    
   
  }, [dispatch]);

  return (
    <div>
      <AppNavbar /> 

      <section className="featured-products">

        <h2 style={{ textAlign: 'center' }} > My Purchased Products</h2>
        
        <div className="product-card-container">
        {products.products && products.products.map((product) => (
            <ProductCard product={product} />
          ))} 
        {
          !products.products &&  <h1>You haven't purchased any products.</h1>
        }
        </div>
      </section>

      
    </div>
  );
}

export default userProduct;
