import React, { useState } from 'react';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import ProductCard from '../../components/productcard'
import './productList.css'

function ProductList() {
    const [searched, setSearched] = useState(true);

  return (
    <div>
      <AppNavbar /> 

      <section className="featured-products">

      {searched ? (
          <h2>Showing search results for "Your Search Query"</h2>
        ) : (
            <h2 style={{ textAlign: 'center' }} > Category Name</h2>
        )}
        
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

export default ProductList;
