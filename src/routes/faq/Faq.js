import React, { useEffect } from 'react';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import SearchBar from '../../components/searchbar';
import Accordion from '../../components/accordion';
import { useDispatch, useSelector } from 'react-redux';
import { getFAQ } from '../../actions/faqActions';
import './Faq.css';

function Faq() {
  const dispatch = useDispatch();
  const faq = useSelector((state) => state.faq.faq);

  useEffect(() => {
    if (faq.length === 0) {
      dispatch(getFAQ());
    }
  }, [dispatch]);

  return (
    <div>
      <AppNavbar />
      <h2>Frequently asked questions</h2>
      <SearchBar text="for questions" className="faqsearchbar" />
      { faq.length === 0 ? (
        <p> There are no questions related to your search.</p>
        ): (
      <section>
          <Accordion faqData={faq} reviewData={null}  />
      </section>
      )}
    </div>
  );
}

export default Faq;
