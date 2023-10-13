import React, { useEffect, useState } from 'react';
import AppNavbar from '../../components/navbar';
import SearchBar from '../../components/searchbar';
import Accordion from '../../components/accordion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserReview } from '../../actions/reviewActions';
import './reviewList.css';

function MyReviews() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviews = useSelector((state) => state.reviews.reviews);
  const user = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    if (!dispatched) {
      const timeout = setTimeout(() => {
        dispatch(getUserReview({ userId: user.user_id }));
        setDispatched(true);
      }, 1000); // Delay dispatch for 1 second

      return () => clearTimeout(timeout);
    }

    if (!user) {
      navigate('/error');
    }
  }, [dispatch, dispatched, user, navigate]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredReviews(reviews);
    } else {
      const filteredReviewItems = reviews.filter((reviewItem) =>
        reviewItem.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(filteredReviewItems)
      setFilteredReviews(filteredReviewItems);
    }
  }, [reviews, searchTerm]);

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearchTerm(term);
  };

  return (
    <div>
      <AppNavbar />
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
