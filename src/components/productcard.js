import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { updateCart } from '../actions/authActions';

function ProductCard({ product }) {
  // Access product data directly from props with the correct property names
  const { category, features, rating, price, description, product_name, image_url, product_id } = product;
  const quantity = 1;
  
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  // Function to handle image load errors
  const handleImageError = () => {
    setImageError(true);
  };
  // Use the image_url if available; otherwise, use the default image URL
  const imageUrl = imageError ? 'football.jpg' : image_url;

  const handleAddToCart = () => {
    // Prepare the product data for cart update
    const cartItem = {
      product_id,
      product_name,
      price,
      imageUrl,
      quantity
    };

    // Dispatch the updateCart action with the product data
    dispatch(updateCart({cartData: cartItem}));
  };



  return (
    <Card style={{ width: '15rem' }}>
      <Link to={`/product/${product_id}`}>
        <Card.Img variant="top" src={`../../${imageUrl}`} 
        alt="Product" 
        onError={handleImageError}
        style={{  height: '250px' }}
        />
      </Link>

      <Card.Body style={{ fontSize: '13px' }}>
        <Card.Title style={{ fontSize: '16px' }}>{product_name}</Card.Title>

        <div className="rating-container">
          <Rating value={rating} edit={false} isHalf={true} activeColor="#FFD700" /> &nbsp; {rating}
        </div>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush" style={{ fontSize: '13px' }}>
        
        <ListGroup.Item>Price: ${price}</ListGroup.Item>
        <ListGroup.Item>Tags: {features}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="primary" size="sm" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;







// garbage: 
  //const globalRating = 4.0;
  // const userState = useSelector((state) => state.auth);
  // const [displayName, setDisplayName] = useState('Guest');

  // useEffect(() => {
  //   console.log("user is logged in")
  //   if (userState.logged) {
  //     setDisplayName(userState.user.username);
  //   } else {
  //     setDisplayName('Guest');
  //   }
  // },[userState]);