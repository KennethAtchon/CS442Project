import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import AppNavbar from '../../components/navbar';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/productcard';
import './productList.css';
import { getProduct } from '../../actions/productActions'; 

function ProductList() {
  const { search } = useParams();
  const dispatch = useDispatch(); // Get the dispatch function
  const products = useSelector((state) => state.products); // Use useSelector to get products from the Redux store

  // Dispatch the getProduct action when the component mounts
  useEffect(() => {

    dispatch(getProduct({name: search}));
    console.log(search);
    
   
  }, [dispatch]);

  return (
    <div>
      <AppNavbar /> 

      <section className="featured-products">

      {
          <h2>Showing search results for "Your Search Query"</h2>
        }
        
        <div className="product-card-container">
        {products.products && products.products.map((product) => (
            <ProductCard product={product} />
          ))} 
        {
          !products.products &&  <h1>No Products Available for that search</h1>
        }
        </div>
      </section>

      
    </div>
  );
}

export default ProductList;
