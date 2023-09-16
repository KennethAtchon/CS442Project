import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function ProductCard() {
  return (
    <Card style={{ width: '15rem'}}>
      <Card.Img variant="top" src="football.jpg" alt="Product" />
      <Card.Body style={{ fontSize: '13px' }}>
        <Card.Title style={{ fontSize: '16px' }}>Product Name</Card.Title>
        Star rating:  
          <span className="star"> &#9733;</span>
          <span className="star">&#9733;</span>
          <span className="star">&#9733;</span>
          <span className="star">&#9733;</span>
          <span className="star">&#9734;</span>
          <span className="rating-count">(25)</span>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula justo id.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush" style={{ fontSize: '13px' }}>
        <ListGroup.Item>Price: $19.99</ListGroup.Item>
        <ListGroup.Item>Tags: Electronics, Gadgets, Sale</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <Button variant="primary" size="sm">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
