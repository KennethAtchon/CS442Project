import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppNavbar from '../../components/navbar';
import ProductCard from '../../components/productcard';
import './Home.css';
import { getHomeProduct } from '../../actions/productActions';
import LoadingSpinner from '../../components/loading/loadingSpinner';


function Home() {
  const dispatch = useDispatch(); // Get the dispatch function
  const products = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(true);

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [promotionsDeals, setPromotionsDeals] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  
  useEffect(() => {
    // Define a function to fetch user products and handle navigation
    console.log(products)
    const fetchData = () => {
      if (isLoading) {
        dispatch(getHomeProduct())
          .then((products) => {
            setIsLoading(false);
            const featured = [];
            const promotions = [];
            const arrivals = [];

            products.forEach((product) => {
              try {
                const customData = JSON.parse(product.customData);

                if (customData.customType === 'Featured') {
                  featured.push(product);
                } else if (customData.customType === 'Sales') {
                  promotions.push(product);
                } else if (customData.customType === 'New') {
                  arrivals.push(product);
                }
              } catch (error) {
                console.error(`Error parsing customData for product ${product.product_id}:`, error);
              }
            });

            setFeaturedProducts(featured);
            setPromotionsDeals(promotions);
            setNewArrivals(arrivals);



          })
          .catch((error) => {
            console.log("Error with the API." + error);
          });
      }

    };

    // Delay the execution by 5 seconds
    const delay = 1000; // 5 seconds
    const timer = setTimeout(() => {
      fetchData();
    }, delay);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [dispatch, isLoading]);



  return (
    <div>
      <AppNavbar /> 

      { isLoading ? (
        <LoadingSpinner viewport={'70vh'} />
        ): (
          <>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-card-container">
          { featuredProducts.length !== 0 && featuredProducts.map((product) => (
            <ProductCard  product={product} />
          ))}
        </div>
      </section>

      {/* Promotions and Deals Section */}
      <section className="promotions-deals">
        <h2>Promotions and Deals</h2>
        <div className="product-card-container">
          {promotionsDeals.length !== 0 && promotionsDeals.map((product) => (
            <ProductCard  product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="product-card-container">
          {newArrivals.length !== 0 && newArrivals.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </section>

        </>
      )}

      
    </div>
  );
}

export default Home;
