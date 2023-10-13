import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import AppNavbar from '../../components/navbar';
import ProductCard from '../../components/productcard';
import { useNavigate } from 'react-router-dom';
import { getUserProduct } from '../../actions/productActions'; 
import LoadingSpinner from '../../components/loading/loadingSpinner';
import './productList.css';


const UserProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch function
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    // Define a function to fetch user products and handle navigation
    const fetchDataAndNavigate = () => {
      if (isLoading) {
        dispatch(getUserProduct({ userId: user ? user.user_id : undefined }))
          .then(() => {
            setIsLoading(false);
          })
          .catch(() => {
            console.log("Error with the API.");
          });
      }

      if (!user) {
        navigate('/error');
      }
    };

    // Delay the execution by 5 seconds
    const delay = 1000; // 5 seconds
    const timer = setTimeout(() => {
      fetchDataAndNavigate();
    }, delay);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [dispatch, user, isLoading, navigate]);

  return (
    <div>
      <AppNavbar /> 

      <section className="featured-products">

        <h2 style={{ textAlign: 'center' }} > My Purchased Products</h2>
        
        { isLoading ? (
        <LoadingSpinner viewport={'70vh'} />
        ): (

        <div className="product-card-container">
        {products.products && products.products.map((product) => (
            <ProductCard product={product} />
          ))} 
        {
          !products.products &&  <h1>You haven't purchased any products.</h1>
        }
        </div>
        )}
      </section>

      
    </div>
  );
}

export default UserProduct;
