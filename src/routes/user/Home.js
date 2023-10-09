import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import AppNavbar from '../../components/navbar';
import ProductCard from '../../components/productcard';
import './Home.css';


function Home() {
  const dispatch = useDispatch(); // Get the dispatch function
  const [products, setProducts] = useState({"products1":[{"product_id":6,"product_name":"Soccer Ball","description":"Official size and weight soccer ball.","price":"19.99","rating":"1.0","image_url":"soccer_ball.jpg","category":"soccer","features":"Durable rubber construction","quantity":100,"supplier_id":1,"supplier_name":"Amazon","address":"123 Main Street, Seattle, WA","delivery_speed":"2 days"},{"product_id":7,"product_name":"Soccer Goal","description":"Portable soccer goal with net.","price":"89.99","rating":"1.5","image_url":"soccer_goal.jpg","category":"soccer","features":"Easy assembly, weather-resistant","quantity":50,"supplier_id":2,"supplier_name":"Alibaba","address":"456 Tech Road, Hangzhou, China","delivery_speed":"3 days"},{"product_id":8,"product_name":"Soccer Cleats","description":"High-performance soccer cleats.","price":"79.99","rating":"2.0","image_url":"soccer_cleats.jpg","category":"soccer","features":"Lightweight and responsive","quantity":200,"supplier_id":3,"supplier_name":"Walmart","address":"789 Supermarket Ave, Bentonville, AR","delivery_speed":"1 day"},{"product_id":9,"product_name":"Soccer Jersey","description":"Official team jersey for soccer.","price":"49.99","rating":"2.5","image_url":"soccer_jersey.jpg","category":"soccer","features":"Team logo, breathable fabric","quantity":75,"supplier_id":1,"supplier_name":"Amazon","address":"123 Main Street, Seattle, WA","delivery_speed":"2 days"},{"product_id":10,"product_name":"Soccer Training Cones","description":"Set of training cones for drills.","price":"14.99","rating":"3.0","image_url":"training_cones.jpg","category":"soccer","features":"Bright colors, durable","quantity":100,"supplier_id":2,"supplier_name":"Alibaba","address":"456 Tech Road, Hangzhou, China","delivery_speed":"3 days"}],
  "products2":[{"product_id":31,"product_name":"Tennis Racket","description":"Professional-grade tennis racket.","price":"129.99","rating":"1.0","image_url":"tennis_racket.jpg","category":"tennis","features":"Graphite frame, lightweight","quantity":30,"supplier_id":3,"supplier_name":"Walmart","address":"789 Supermarket Ave, Bentonville, AR","delivery_speed":"1 day"},{"product_id":32,"product_name":"Tennis Balls (Set of 3)","description":"High-quality tennis balls for matches.","price":"12.99","rating":"1.5","image_url":"tennis_balls.jpg","category":"tennis","features":"Optimal bounce, durable felt","quantity":100,"supplier_id":2,"supplier_name":"Alibaba","address":"456 Tech Road, Hangzhou, China","delivery_speed":"3 days"},{"product_id":33,"product_name":"Tennis Shoes","description":"Comfortable tennis shoes for all-court play.","price":"89.99","rating":"2.0","image_url":"tennis_shoes.jpg","category":"tennis","features":"Cushioned sole, lateral support","quantity":50,"supplier_id":1,"supplier_name":"Amazon","address":"123 Main Street, Seattle, WA","delivery_speed":"2 days"},{"product_id":34,"product_name":"Tennis Bag","description":"Carry bag for tennis rackets and gear.","price":"34.99","rating":"2.5","image_url":"tennis_bag.jpg","category":"tennis","features":"Multiple compartments, adjustable strap","quantity":40,"supplier_id":3,"supplier_name":"Walmart","address":"789 Supermarket Ave, Bentonville, AR","delivery_speed":"1 day"},{"product_id":35,"product_name":"Tennis Net","description":"Regulation-sized tennis net for practice.","price":"49.99","rating":"3.0","image_url":"tennis_net.jpg","category":"tennis","features":"Steel frame, quick setup","quantity":20,"supplier_id":2,"supplier_name":"Alibaba","address":"456 Tech Road, Hangzhou, China","delivery_speed":"3 days"}],
  "products3":[{"product_id":41,"product_name":"Football","description":"Official size and weight football.","price":"24.99","rating":"1.0","image_url":"football.jpg","category":"football","features":"Durable leather construction","quantity":100,"supplier_id":3,"supplier_name":"Walmart","address":"789 Supermarket Ave, Bentonville, AR","delivery_speed":"1 day"},{"product_id":42,"product_name":"Football Helmet","description":"Protective football helmet with facemask.","price":"79.99","rating":"1.5","image_url":"football_helmet.jpg","category":"football","features":"Impact protection, comfortable fit","quantity":30,"supplier_id":2,"supplier_name":"Alibaba","address":"456 Tech Road, Hangzhou, China","delivery_speed":"3 days"},{"product_id":43,"product_name":"Football Gloves","description":"Grip-enhancing football gloves for receivers.","price":"19.99","rating":"2.0","image_url":"football_gloves.jpg","category":"football","features":"Silicone grip, breathable fabric","quantity":60,"supplier_id":1,"supplier_name":"Amazon","address":"123 Main Street, Seattle, WA","delivery_speed":"2 days"},{"product_id":44,"product_name":"Football Shoulder Pads","description":"Shoulder pads for added protection.","price":"49.99","rating":"2.5","image_url":"football_shoulder_pads.jpg","category":"football","features":"Adjustable fit, lightweight","quantity":40,"supplier_id":3,"supplier_name":"Walmart","address":"789 Supermarket Ave, Bentonville, AR","delivery_speed":"1 day"},{"product_id":45,"product_name":"Football Cleats","description":"High-performance football cleats.","price":"89.99","rating":"3.0","image_url":"football_cleats.jpg","category":"football","features":"Sturdy construction, traction cleats","quantity":50,"supplier_id":2,"supplier_name":"Alibaba","address":"456 Tech Road, Hangzhou, China","delivery_speed":"3 days"}]

});

  return (
    <div>
      <AppNavbar /> 

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-card-container">

        {products.products1 && products.products1.map((product) => (
            <ProductCard product={product} />
          ))} 


        </div>
      </section>

    {/* Promotions and Deals Section */}
    <section className="promotions-deals">
      <h2>Promotions and Deals</h2>
      <div className="product-card-container">
      {products.products2 && products.products2.map((product) => (
            <ProductCard product={product} />
          ))} 

        </div>
    </section>

    {/* New Arrivals Section */}
     <section className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="product-card-container">
      {products.products3 && products.products3.map((product) => (
            <ProductCard product={product} />
          ))} 

        </div>
    </section>

      
    </div>
  );
}

export default Home;
