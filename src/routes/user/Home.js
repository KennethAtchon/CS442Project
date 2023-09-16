import React from 'react';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import ProductCard from '../../components/productcard'
import './Home.css'

function Home() {
  return (
    <div>
      <AppNavbar /> 

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-card-container">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>

    {/* Promotions and Deals Section */}
    <section className="promotions-deals">
      <h2>Promotions and Deals</h2>
      <div className="product-card-container">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
    </section>

    {/* New Arrivals Section */}
    <section className="new-arrivals">
      <h2>New Arrivals</h2>
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

export default Home;
