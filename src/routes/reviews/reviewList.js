import React from 'react';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import SearchBar from '../../components/searchbar';
import Accordion from '../../components/accordion'
import './reviewList.css'; // You can create a CSS file for styling

function MyReviews() {
  return (
    <div>
      <AppNavbar /> {/* Include the navigation bar */}
      <h2>My Reviews</h2>
      <SearchBar text="for reviews" className="reviewsearchbar" />

      {/* Section for displaying reviews */}
      <section className="my-reviews-section">
        <Accordion key="7"/>
      </section>
    </div>
  );
}

export default MyReviews;
