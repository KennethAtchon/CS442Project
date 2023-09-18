import React from 'react';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import ProductCard from '../../components/productcard'
import './userProduct.css'

function userProduct() {

  return (
    <div>
      <AppNavbar /> 

      <section className="featured-products">

        <h2 style={{ textAlign: 'center' }} > My Purchased Products</h2>
        
        <div className="product-card-container">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>

      
    </div>
  );
}

export default userProduct;