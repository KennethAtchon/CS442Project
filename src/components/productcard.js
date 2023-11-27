import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import { useDispatch, useSelector  } from 'react-redux'; // Import useDispatch
import { updateCart } from '../actions/authActions';

function ProductCard({ product }) {
  // Access product data directly from props with the correct property names
  const { category, features, rating, price, description, product_name, image_url, product_id } = product;
  const user = useSelector((state) => state.auth.user);
  const quantity = 1;

  const dispatch = useDispatch();

  const [newPrice, setNewPrice] = useState('');
  const [isNewPrice, setIsNewPrice] = useState(false);

  useEffect(() => {
    if (product.customData ) {
      const customData = JSON.parse(product.customData);

       if(customData.newPrice){
        setNewPrice(customData.newPrice);
       setIsNewPrice(true);
       }else{
        setNewPrice('');
        setIsNewPrice(false);
       }
       
    } else {
      setNewPrice('');
      setIsNewPrice(false);
    }
  }, [product]);
  
  const handleAddToCart = () => {
    // Prepare the product data for cart update
    const cartItem = {
      product_id,
      product_name,
      price: isNewPrice ? newPrice : price,
      image_url,
      quantity
    };

    // Dispatch the updateCart action with the product data
    dispatch(updateCart({ userId: user ? user.user_id : undefined, cartData: cartItem }));

  };





  return (
    <Card style={{ width: '15rem', border: 2mm ridge rgba(31, 81, 255, 1) }}>
      <Link to={`/product/${product_id}`}>
        <Card.Img variant="top" src={`/images/${image_url}`} 
        alt="Product" 
        style={{  height: '200px', objectFit: 'contain' }}
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
        
        <ListGroup.Item>Price:  {isNewPrice ? <del>${price}</del> : `$${price}`}{' '}
        {isNewPrice && <span style={{ color: 'red' }}>${newPrice}</span>}
        </ListGroup.Item>
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
