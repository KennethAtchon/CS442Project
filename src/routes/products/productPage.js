// ProductDetail.js
import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import ReviewSection from '../../components/reviews/reviewSection'
import Rating from 'react-rating-stars-component';
import { Container, Row, Col, Card, Button, Image, Form, ListGroup } from 'react-bootstrap';
import { getProduct } from '../../actions/productActions'; 
import { updateCart } from '../../actions/authActions';
import LoadingSpinner from '../../components/loading/loadingSpinner';
import './productPage.css'; // Import the CSS file

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL parameter
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.products);
  var product = products.find((product) => product.product_id === parseInt(id));
  const cartItems = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the getProduct action with the product_id from the URL parameter
    console.log(product)

    if(!product){
      dispatch(getProduct({ product_id: id }))
    }
    
  }, [dispatch]);

  const handleQuantityChange = (e) => {
    // Update the quantity when the user changes it
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToCart = () => {
    // Unpack product properties
    const { product_id, product_name, price, image_url } = product;
  
    // Prepare the product data for cart update
    const cartItem = {
      product_id,
      product_name,
      price,
      image_url,
      quantity,
    };

    console.log(cartItem)
  
    // Dispatch the updateCart action with the product data
    dispatch(updateCart({ userId: user ? user.user_id : undefined, cartData: cartItem }));
  };

  const handleCheckout = () => {
    // First, add the product to the cart
    var cart = cartItems.find((cartItems) => parseInt(cartItems.product_id)  === parseInt(product.product_id));
    if(!cart){
      handleAddToCart();
    }
    

    // Then, navigate to /checkout
    navigate('/checkout');
  };
  

  return (
    <>
    < AppNavbar />

    { !product ? (
      <LoadingSpinner viewport={'70vh'} />
    ) : (
    <Container className="mt-5">
      <Row>
        {/* Left Column: Large Product Image */}
        <Col>
          <Image
            src={`../../${product && (product.image_url)}`}
            alt="Product"
            className="img-fluid"
          />
        </Col>

        {/* Right Column: Product Details */}
        <Col>
          {/* Product Name */}
          <h2 className="product-name">{product && (product.product_name)}</h2>
          {/* Sold by */}
          <p className="sold-by">Sold by: {product && (product.supplier_name)}</p>

          {/* Product Rating */}
          <div className="rating-container">  
                <Rating
                  value={product && (product.rating)}
                  edit={false}
                  isHalf={true}
                  activeColor="#FFD700"
                /> &nbsp; {product && (product.rating)}
              </div>

          <hr />
          {/* Product Description */}
          <p className="mt-3">
            {product && product.description}
          </p>
        </Col>
        <Col>
        <Card style={{ width: '18rem' }}>
      <Card.Header>Product Details</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Price:</strong> ${product && (product.price)}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Availability:</strong> {'In Stock'}
        </ListGroup.Item>
        {product && (
          <ListGroup.Item>
            {/* {product.delivery_speed} */}
            <strong>Estimated Delivery:</strong> Fast
          </ListGroup.Item>
        )}
      <ListGroup.Item>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <Form.Label style={{ marginRight: '10px' }}>Quantity:</Form.Label>
        </div>
        <div>
          <Form.Control
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div>
      </div>
      </ListGroup.Item>
      
      <ListGroup.Item className="text-center">
      <Button
        variant="primary"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button> 
      </ListGroup.Item>

      <ListGroup.Item className="text-center">
      <Button variant="success" 
          onClick={handleCheckout}
      >
          Checkout
        </Button> 
      </ListGroup.Item>

    </ListGroup>
    </Card>
        </Col>
      </Row>
    </Container>
    )}
      <ReviewSection />
    
    </>
  );
};

export default ProductPage;
