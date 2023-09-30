import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import AppNavbar from '../../components/navbar';
import ProductCard from '../../components/productcard';
import './Home.css';
import { getProduct } from '../../actions/productActions'; 

function Home() {
  const dispatch = useDispatch(); // Get the dispatch function
  const products = useSelector((state) => state.products); // Use useSelector to get products from the Redux store
  const defaultProducts = [
    {
      category: 'DefaultCategory',
      features: 'DefaultFeatures',
      price: 10,
      description: 'DefaultDescription',
      name: 'DefaultName',
    },
  ];


  // Dispatch the getProduct action when the component mounts
  useEffect(() => {
    // You can pass the "soccer" category as an argument
    dispatch(getProduct({supplier_name: "Supplier 1"}));
    
   
  }, [dispatch]);

  return (
    <div>
      <AppNavbar /> 

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-card-container">

        {products.products && products.products.map((product) => (
            <ProductCard product={product} />
          ))} 
        {
          !products.products && <ProductCard product={defaultProducts} />
        }


        </div>
      </section>

    {/* Promotions and Deals Section */}
    <section className="promotions-deals">
      <h2>Promotions and Deals</h2>
      <div className="product-card-container">
      {products && products.products.map((product) => (
            <ProductCard product={product} />
          ))} 
        {
          !products && <ProductCard product={defaultProducts} />
        }
        </div>
    </section>

    {/* New Arrivals Section */}
     <section className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="product-card-container">
      {products && products.products.map((product) => (
            <ProductCard product={product} />
          ))} 
        {
          !products && <ProductCard product={defaultProducts} />
        }
        </div>
    </section>

      
    </div>
  );
}

export default Home;
