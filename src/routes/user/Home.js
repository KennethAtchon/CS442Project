import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import AppNavbar from '../../components/navbar';
import ProductCard from '../../components/productcard';
import './Home.css';
import { getProduct } from '../../actions/productActions'; 


function Home() {
  const dispatch = useDispatch(); // Get the dispatch function
  const [products, setProducts] = useState({
    "products1": [
      {
        "product_id": 11,
        "product_name": "Adidas Tango Soccer Ball",
        "description": "Official FIFA-approved soccer ball with excellent durability and performance.",
        "price": "29.99",
        "rating": "4.5",
        "image_url": "soccer1.jpg",
        "category": "soccer",
        "features": "High-quality materials, suitable for both training and matches.",
        "quantity": 100,
        "supplier_id": 1,
        "supplier_name": "Alibaba",
        "address": "123 Main Street, Cityville, State 12345",
        "delivery_speed": "9-12 days"
      },
      {
        "product_id": 14,
        "product_name": "Soccer Goal Net",
        "description": "Durable soccer goal net suitable for practice and games.",
        "price": "19.99",
        "rating": "3.5",
        "image_url": "soccer-net.jpg",
        "category": "soccer",
        "features": "Heavy-duty nylon netting, easy setup, and storage.",
        "quantity": 200,
        "supplier_id": 1,
        "supplier_name": "Alibaba",
        "address": "123 Main Street, Cityville, State 12345",
        "delivery_speed": "9-12 days"
      },
      {
        "product_id": 12,
        "product_name": "Nike Mercurial Soccer Cleats",
        "description": "Top-tier soccer cleats designed for speed and agility on the field.",
        "price": "89.99",
        "rating": "4.0",
        "image_url": "soccer-cleats1.jpg",
        "category": "soccer",
        "features": "Flyknit construction, responsive traction, available in various sizes.",
        "quantity": 75,
        "supplier_id": 2,
        "supplier_name": "Sports Gear Co.",
        "address": "456 Elm Avenue, Townsville, State 67890",
        "delivery_speed": "7-10 days"
      },
      {
        "product_id": 15,
        "product_name": "Soccer Training Cones Set",
        "description": "Set of 10 agility cones for soccer training drills and skill development.",
        "price": "12.99",
        "rating": "4.0",
        "image_url": "soccer-cones.jpg",
        "category": "soccer",
        "features": "Bright and durable, ideal for improving dribbling and agility.",
        "quantity": 150,
        "supplier_id": 2,
        "supplier_name": "Sports Gear Co.",
        "address": "456 Elm Avenue, Townsville, State 67890",
        "delivery_speed": "7-10 days"
      },
      {
        "product_id": 13,
        "product_name": "Puma Future Soccer Jersey",
        "description": "Soccer jersey with advanced moisture-wicking technology for comfort.",
        "price": "34.99",
        "rating": "4.5",
        "image_url": "soccer-jersey1.jpg",
        "category": "soccer",
        "features": "Breathable fabric, stylish design, multiple color options.",
        "quantity": 60,
        "supplier_id": 3,
        "supplier_name": "Outdoor Sports Emporium",
        "address": "789 Oak Lane, Countryside, State 54321",
        "delivery_speed": "10-14 days"
      }
    ],
  "products2": [
    {
      "product_id": 1,
      "product_name": "Spalding NBA Basketball",
      "description": "Official size and weight basketball for professional play.",
      "price": "29.99",
      "rating": "4.5",
      "image_url": "basketball1.jpg",
      "category": "basketball",
      "features": "Durable rubber construction, suitable for indoor and outdoor use.",
      "quantity": 100,
      "supplier_id": 1,
      "supplier_name": "Alibaba",
      "address": "123 Main Street, Cityville, State 12345",
      "delivery_speed": "9-12 days"
    },
    {
      "product_id": 3,
      "product_name": "Nike Elite Basketball Shoes",
      "description": "Premium basketball shoes with responsive cushioning and support.",
      "price": "89.99",
      "rating": "4.0",
      "image_url": "basketball-shoes1.jpg",
      "category": "basketball",
      "features": "Flywire technology, Zoom Air cushioning, available in various sizes.",
      "quantity": 50,
      "supplier_id": 1,
      "supplier_name": "Alibaba",
      "address": "123 Main Street, Cityville, State 12345",
      "delivery_speed": "9-12 days"
    },
    {
      "product_id": 2,
      "product_name": "Wilson Evolution Basketball",
      "description": "High-quality composite leather basketball with exceptional grip.",
      "price": "39.99",
      "rating": "5.0",
      "image_url": "basketball2.jpg",
      "category": "basketball",
      "features": "Cushion Core Technology for a soft feel, NFHS approved.",
      "quantity": 75,
      "supplier_id": 2,
      "supplier_name": "Sports Gear Co.",
      "address": "456 Elm Avenue, Townsville, State 67890",
      "delivery_speed": "7-10 days"
    },
    {
      "product_id": 5,
      "product_name": "Basketball Training Cones Set",
      "description": "Set of 10 agility cones for basketball training drills.",
      "price": "12.99",
      "rating": "3.0",
      "image_url": "cones.jpg",
      "category": "basketball",
      "features": "Durable plastic cones, suitable for various training exercises.",
      "quantity": 200,
      "supplier_id": 2,
      "supplier_name": "Sports Gear Co.",
      "address": "456 Elm Avenue, Townsville, State 67890",
      "delivery_speed": "7-10 days"
    },
    {
      "product_id": 4,
      "product_name": "Spalding TF-1000 Basketball",
      "description": "Composite leather basketball designed for indoor use.",
      "price": "34.99",
      "rating": "3.5",
      "image_url": "basketball3.jpg",
      "category": "basketball",
      "features": "Deep channel design, great grip, ideal for indoor courts.",
      "quantity": 60,
      "supplier_id": 3,
      "supplier_name": "Outdoor Sports Emporium",
      "address": "789 Oak Lane, Countryside, State 54321",
      "delivery_speed": "10-14 days"
    }
  ],
    "products3": [
      {
        "product_id": 16,
        "product_name": "Wilson Pro Staff Tennis Racket",
        "description": "High-quality tennis racket designed for advanced players.",
        "price": "99.99",
        "rating": "4.5",
        "image_url": "tennis-racket1.jpg",
        "category": "tennis",
        "features": "Graphite construction, excellent control and power.",
        "quantity": 50,
        "supplier_id": 1,
        "supplier_name": "Alibaba",
        "address": "123 Main Street, Cityville, State 12345",
        "delivery_speed": "9-12 days"
      },
      {
        "product_id": 19,
        "product_name": "Tennis Court Net Set",
        "description": "Professional-grade tennis net set for your home court.",
        "price": "149.99",
        "rating": "4.0",
        "image_url": "tennis-net-set.jpg",
        "category": "tennis",
        "features": "Includes net, poles, and accessories for easy setup.",
        "quantity": 30,
        "supplier_id": 1,
        "supplier_name": "Alibaba",
        "address": "123 Main Street, Cityville, State 12345",
        "delivery_speed": "9-12 days"
      },
      {
        "product_id": 17,
        "product_name": "Penn Championship Tennis Balls",
        "description": "Official tennis balls for tournament and recreational play.",
        "price": "24.99",
        "rating": "4.0",
        "image_url": "tennis-balls1.jpg",
        "category": "tennis",
        "features": "Durable felt, consistent bounce, pack of 12.",
        "quantity": 100,
        "supplier_id": 2,
        "supplier_name": "Sports Gear Co.",
        "address": "456 Elm Avenue, Townsville, State 67890",
        "delivery_speed": "7-10 days"
      },
      {
        "product_id": 20,
        "product_name": "Tennis Practice Ball Machine",
        "description": "Automated tennis ball machine for practice and training.",
        "price": "349.99",
        "rating": "3.5",
        "image_url": "tennis-ball-machine.jpg",
        "category": "tennis",
        "features": "Adjustable speed and angle, remote control included.",
        "quantity": 10,
        "supplier_id": 2,
        "supplier_name": "Sports Gear Co.",
        "address": "456 Elm Avenue, Townsville, State 67890",
        "delivery_speed": "7-10 days"
      },
      {
        "product_id": 18,
        "product_name": "Nike Court Advantage Tennis Backpack",
        "description": "Tennis backpack with specialized compartments for gear and rackets.",
        "price": "49.99",
        "rating": "4.5",
        "image_url": "tennis-backpack1.jpg",
        "category": "tennis",
        "features": "Padded straps, multiple pockets, stylish design.",
        "quantity": 75,
        "supplier_id": 3,
        "supplier_name": "Outdoor Sports Emporium",
        "address": "789 Oak Lane, Countryside, State 54321",
        "delivery_speed": "10-14 days"
      }
    ]

  });

  return (
    <div>
      <AppNavbar /> 

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-card-container">

        {products && products.products1.map((product) => (
            <ProductCard product={product} />
          ))} 


        </div>
      </section>

    {/* Promotions and Deals Section */}
    <section className="promotions-deals">
      <h2>Promotions and Deals</h2>
      <div className="product-card-container">
      {products && products.products2.map((product) => (
            <ProductCard product={product} />
          ))} 

        </div>
    </section>

    {/* New Arrivals Section */}
     <section className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="product-card-container">
      {products && products.products3.map((product) => (
            <ProductCard product={product} />
          ))} 

        </div>
    </section>

      
    </div>
  );
}

export default Home;
