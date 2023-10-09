import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import AppNavbar from '../../components/navbar';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/productcard';
import './productList.css';
import { getProduct } from '../../actions/productActions'; 

function ProductList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');
  const dispatch = useDispatch(); // Get the dispatch function
  const products = useSelector((state) => state.products); // Use useSelector to get products from the Redux store

  // Dispatch the getProduct action when the component mounts
  useEffect(() => {

    const searchCriteria = {
      name: undefined,
      category: undefined,
      features: undefined,
      rating: undefined,
      price: undefined,
      description: undefined,
      product_id: undefined,
      supplier_name: undefined,
      supplier_address: undefined,
      delivery_speed: undefined,
    };
    

    const namePattern = /^[A-Za-z\s]+$/;

    const searchTerms = searchTerm.split(' ');

    // Process each search term
    searchTerms.forEach((term) => {
      if (namePattern.test(term)) {
        searchCriteria.name = term;
      } else {
        const colonIndex = term.indexOf(':');
        if (colonIndex !== -1) {
          const criterion = term.substring(0, colonIndex).toLowerCase();
          const value = term.substring(colonIndex + 1);
    
          switch (criterion) {
            case 'category':
              searchCriteria.category = value;
              break;
            case 'features':
              searchCriteria.features = value;
              break;
            case 'rating':
              searchCriteria.rating = parseFloat(value);
              break;
            case 'price':
              searchCriteria.price = parseFloat(value);
              break;
            case 'description':
              searchCriteria.description = value;
              break;
            case 'product_id':
              searchCriteria.product_id = parseInt(value);
              break;
            case 'supplier_name':
              searchCriteria.supplier_name = value;
              break;
            case 'supplier_address':
              searchCriteria.supplier_address = value;
              break;
            case 'deliveryspeed':
              searchCriteria.delivery_speed = value;
              break;
            default:
              // Handle unrecognized criteria here
              break;
          }
        }
      }
      // Add more conditions for other criteria as needed
    });
    
    //console.log(searchCriteria);

    dispatch(getProduct(searchCriteria));

   
  }, [dispatch]);

  return (
    <div>
      <AppNavbar /> 

      <section className="featured-products">

      {
          <h2>Showing search results for "{searchTerm}"</h2>
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
