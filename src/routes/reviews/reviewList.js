import React, { useEffect, useState } from 'react';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import SearchBar from '../../components/searchbar';
import Accordion from '../../components/accordion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserReview } from '../../actions/reviewActions';
import './reviewList.css'; // You can create a CSS file for styling

function MyReviews() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviews = useSelector((state) => state.reviews.reviews);
  const user = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    
    if (reviews.length === 0) {
      dispatch(getUserReview({ userId: user.user_id }));
    }

    if (!user) {
      navigate('/error');
    }
  }, [dispatch]);


  useEffect(() => {
    if (searchTerm === '') {
      // If the search term is empty, show all reviews
      setFilteredReviews(reviews);
    } else {
      const filteredReviewItems = reviews.filter((reviewItem) =>
        reviewItem.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReviews(filteredReviewItems);
    }
  }, [reviews, searchTerm]);

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearchTerm(term);
  };

  return (
    <div>
      <AppNavbar /> {/* Include the navigation bar */}
      <h2>My Reviews</h2>
      <SearchBar text="for reviews" className="reviewsearchbar" onSearch={handleSearch} />
      {filteredReviews.length === 0 ? (
        <p>
          You don't have any reviews or there are no reviews related to your search.
        </p>
      ) : (
        <section className="my-reviews-section">
          <Accordion faqData={null} reviewData={filteredReviews} />
        </section>
      )}
    </div>
  );
}

export default MyReviews;
