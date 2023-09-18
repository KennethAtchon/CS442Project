import React from 'react';
import {Card} from 'react-bootstrap';
import Rating from 'react-rating-stars-component';

const Review = ({ userName, reviewText, starRating, reviewDate }) => {
    return (
      <Card className="mb-3">
        <Card.Body>
          <div className="user-info">
            <Card.Title>{userName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"><Rating
                  value={starRating}
                  edit={false}
                  isHalf={true}
                  activeColor="#FFD700"
                />
            <p>{reviewDate}</p>
            </Card.Subtitle>
            
          </div>
          <div className="star-rating">
            {/* Display star rating here */}
            {/* You can use icons or any other method to display star rating */}
          </div>
          <p className="review-text">{reviewText}</p>
        </Card.Body>
      </Card>
    );
  };

const Reviews = ({ reviews }) => {
  if (reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <div className="reviews">
      {reviews.map((review, index) => (
        <Review
          key={index}
          userName={review.userName}
          reviewText={review.reviewText}
          starRating={review.starRating}
          reviewDate={review.reviewDate}
        />
      ))}
    </div>
  );
};

export default Reviews;
