import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppNavbar from '../../components/navbar';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/productcard';
import './productList.css';
import { getProduct } from '../../actions/productActions';
import LoadingSpinner from '../../components/loading/loadingSpinner';

function ProductCategory() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  // Create a state variable to keep track of the previous category
  const [prevCategory, setPrevCategory] = useState('');

  useEffect(() => {

    // Define a timer that calls getProduct every second
    const timer = setInterval(() => {
      if (category !== prevCategory) {
        // Only dispatch when the category changes
        dispatch(getProduct({ category: category }));
        setPrevCategory(category); 
      }
    }, 1000); 

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [dispatch, category, prevCategory]);

  return (
    <div>
      <AppNavbar />

      {products.products.length === 0 ? (
        <LoadingSpinner viewport={'70vh'} />
      ) : (
        <section className="featured-products">
          <h2 style={{ textAlign: 'center' }}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>

          <div className="product-card-container">
            {products.products &&
              products.products.map((product) => (
                <ProductCard product={product} />
              ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductCategory;
