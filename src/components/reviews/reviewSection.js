import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Card, ProgressBar, Button, Form, FloatingLabel } from 'react-bootstrap';
import UsersReviews from './usersReviews';
import Rating from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {createReview, getReview, checkReview} from '../../actions/reviewActions';
import './reviewSection.css'

  function calculateRatings(reviews) {
    let globalRating = 0;
    let starRatings = [ 0, 0, 0, 0, 0 ]
  
    for (const review of reviews) {
      const rating = parseFloat(review.rating);
      globalRating += rating;
  
      // Count the star ratings
      if (rating >= 1 && rating < 2) {
        starRatings[0]++;
      } else if (rating >= 2 && rating < 3) {
        starRatings[1]++;
      } else if (rating >= 3 && rating < 4) {
        starRatings[2]++;
      } else if (rating >= 4 && rating < 5) {
        starRatings[3]++;
      } else if (rating >= 5) {
        starRatings[4]++;
      }
    }
    // Calculate the average global rating
    if (reviews.length > 0) {
      globalRating /= reviews.length;
    }
    globalRating = globalRating.toFixed(2);
  
    return { globalRating, starRatings };
  }

function ProductReviewSection() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [validated, setValidated] = useState(false);
  const reviews = useSelector((state) => state.reviews);

  const totalRating = reviews.reviews.length !== 0 ? reviews.reviews.length: 0; // Total global ratings
  const { globalRating, starRatings } = calculateRatings(reviews.reviews);

  useEffect(() => {
    console.log(reviews)
    if(reviews.reviews.length === 0){
      dispatch( getReview({productId: id}))

    }

    if(user !== null){
      dispatch(checkReview({productId: id, userId: user.user_id}))
    }
    
  }, [dispatch, id]);

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
      setValidated(true);
    }else{

      setValidated(true);
      const currentDate = new Date();
      const currentDate2 = currentDate.toString()

      dispatch(createReview({userId: user.user_id, productId: id, reviewText: formData.reviewText, rating: formData.reviewRating, date: currentDate2}))

      dispatch( getReview({productId: id}))

    }
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
              {starRatings.slice().reverse().map((rating, index) => (
              <div key={index} className="star-progress-bar">
                <span>{5- index} star</span>
                <ProgressBar now={(rating / totalRating) * 100} label={`${(rating / totalRating) * 100}%`} variant='warning' />
              </div>
            ))}
              </div>

            </Card.Body>
          </Card>

        {user && reviews.canReview ? (
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
        ): null}

        </Col>
        
        {/* Row 1: Column 2 - Collection of Reviews */}
        <Col xs={12} md={8} xl={7} className='mt-3 mb-3' >
          <Card>
            <Card.Body className='reviews-size'>
              <h5>Product Reviews</h5>
              < UsersReviews reviews={reviews.reviews} />
            </Card.Body>
          </Card>
        </Col>
      
      {/* Row 2: Column 1 - Write Your Own Review */}
      

    </Row>

    </Container>
  );
}

export default ProductReviewSection;
