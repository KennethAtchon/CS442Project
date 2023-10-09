import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import AppNavbar from '../../components/navbar';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/productcard';
import './productList.css';
import { getProduct } from '../../actions/productActions'; 
import LoadingSpinner from '../../components/loading/loadingSpinner';

function ProductCategory() {
  const { category } = useParams();
  const dispatch = useDispatch(); // Get the dispatch function
  const products = useSelector((state) => state.products); // Use useSelector to get products from the Redux store



  // Dispatch the getProduct action when the component mounts
  useEffect(() => {
    console.log("This should not run alot")
    
    dispatch(getProduct({category: category}));

   
  }, [dispatch]);

  return (
    <div>
      <AppNavbar /> 

      { products.products.length === 0 ? (
        <LoadingSpinner viewport={'70vh'} />
      ): (
      
      <section className="featured-products">

      <h2 style={{ textAlign: 'center' }} > {category.charAt(0).toUpperCase() + category.slice(1)} </h2>
        
        <div className="product-card-container">
        {products.products && products.products.map((product) => (
            <ProductCard product={product} />
          ))} 
        </div>
      </section>

      )}
    </div>
  );
}

export default ProductCategory;