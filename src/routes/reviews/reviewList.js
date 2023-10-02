import React, {useEffect} from 'react';
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

  useEffect(() => {
    if (reviews.length === 0) {
      dispatch(getUserReview({userId: user.user_id}));
    }

    if(!user){
      navigate('/error')
    }
  }, [dispatch, reviews]);
  return (
    <div>
      <AppNavbar /> {/* Include the navigation bar */}
      <h2>My Reviews</h2>
      <SearchBar text="for reviews" className="reviewsearchbar" />

      {/* Section for displaying reviews */}
      <section className="my-reviews-section">
        <Accordion faqData={null} reviewData={reviews} />
      </section>
    </div>
  );
}

export default MyReviews;
