import React, {useState} from 'react';
import { Container, Row, Col, Card, ProgressBar, Button, Form, FloatingLabel } from 'react-bootstrap';
import UsersReviews from './usersReviews';
import Rating from 'react-rating-stars-component';
import './reviewSection.css'

function ProductReviewSection() {
  const totalRating = 1000; // Total global ratings
  const globalRating = 4.5; // Global rating out of 5
  const starRatings = [300, 250, 200, 150, 100];
  const [validated, setValidated] = useState(false);

  const noReviews = [];

  // Reviews with 3 reviews
  const reviewsWithThree = [
    {
      userName: 'User1',
      reviewText: 'This is the first review.',
      starRating: 4,
      reviewDate: '2023-09-18',
    },
    {
      userName: 'User2',
      reviewText: 'This is the second review.',
      starRating: 5,
      reviewDate: '2023-09-19',
    },
    {
      userName: 'User3',
      reviewText: 'This is the third review.',
      starRating: 3,
      reviewDate: '2023-09-20',
    },
  ];



  const [formData, setFormData] = useState({
    reviewRating: 0, // Initialize with an empty string
    reviewText: '', // Initialize with an empty string
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
  };


  return (
    <Container>
      <Row>
        {/* Row 1: Column 1 - Star Rating */}
        <Col md={4} className='mt-3'>
          <Card>
            <Card.Body>
              {/* Star Rating Input */}
              {/* You can use a library like react-rating-stars-component */}
              <h5>Customer Reviews</h5>
              <div className="rating-container"> 
                <Rating
                  value={globalRating}
                  edit={false}
                  isHalf={true}
                  activeColor="#FFD700"
                /> &nbsp; {globalRating} 
              </div>
              <p>{totalRating} global ratings</p>

              <div className="star-progress-bars">
                {starRatings.map((rating, index) => (
                  <div key={rating} className="star-progress-bar">
                    <span>{5 - index} star</span>
                    <ProgressBar now={(rating / totalRating) * 100} label={`${(rating / totalRating) * 100}%`} variant='warning' />
                  </div>
                ))}
              </div>

            </Card.Body>
          </Card>

        <Card className='mt-3'>
          <Card.Body>
            <h5>Write Your Own Review</h5>
            <Form noValidate validated={validated} onSubmit={handleSubmitReview}>
              {/* Review Rating */}
              <Rating
              count={5} // Number of stars
              size={24} // Size of stars
              isHalf={true} // Set to true if you want half-star ratings
              value={formData.reviewRating} // Current rating value
              activeColor="#FFD700" // Color of active stars
              onChange={(newRating) => setFormData({ ...formData, reviewRating: newRating })}
              required
            />
            
              {/* Review Text */}
              <FloatingLabel controlId="reviewText" label="Write Your Review" className="mt-3">
                <Form.Control
                  as="textarea"
                  name="reviewText"
                  value={formData.reviewText}
                  onChange={handleInputChange}
                  placeholder="Enter your review"
                  required
                />
                  <Form.Control.Feedback type="invalid">
                Please enter a review.
                </Form.Control.Feedback>
              </FloatingLabel>

              {/* Submit Button */}
              <div className="d-grid mt-3">
                <Button type="submit" variant="primary">
                  Submit Review
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        </Col>
        
        {/* Row 1: Column 2 - Collection of Reviews */}
        <Col xs={12} md={8} xl={7} className='mt-3' >
          <Card>
            <Card.Body>
              <h5>Product Reviews</h5>
              < UsersReviews reviews={reviewsWithThree} />
            </Card.Body>
          </Card>
        </Col>
      
      {/* Row 2: Column 1 - Write Your Own Review */}
      

    </Row>

    </Container>
  );
}

export default ProductReviewSection;
