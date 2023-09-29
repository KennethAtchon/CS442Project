import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from 'react-rating-stars-component';

function ProductCard({ product }) {
  // Access product data directly from props with the correct property names
  const { category, features, rating, price, description, name, image, product_id } = product;

  return (
    <Card style={{ width: '15rem' }}>
      <Link to={`/product/${product_id}`}>
        <Card.Img variant="top" src={image} alt="Product" />
      </Link>

      <Card.Body style={{ fontSize: '13px' }}>
        <Card.Title style={{ fontSize: '16px' }}>{name}</Card.Title>

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
        <Button variant="primary" size="sm">
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