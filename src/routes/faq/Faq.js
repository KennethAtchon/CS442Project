import React, { useEffect, useState } from 'react';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import SearchBar from '../../components/searchbar';
import Accordion from '../../components/accordion';
import { useDispatch, useSelector } from 'react-redux';
import { getFAQ } from '../../actions/faqActions';
import './Faq.css';

function Faq() {
  const dispatch = useDispatch();
  const faq = useSelector((state) => state.faq.faq);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaq, setFilteredFaq] = useState([]);

  useEffect(() => {
    if (faq.length === 0) {
      dispatch(getFAQ());
    }
  }, [dispatch]);

  // Update filteredFaq whenever faq or searchTerm changes
  useEffect(() => {
    console.log("trying")
    if (searchTerm === '') {
      // If the search term is empty, show all questions
      setFilteredFaq(faq);
    } else {
      const filteredQuestions = faq.filter((faqItem) =>
  faqItem.question.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredFaq(filteredQuestions);
    }
  }, [faq, searchTerm]);

  const handleSearch = (term) => {
    console.log("working!!")

    setSearchTerm(term);
  };

  return (
    <div>
      <AppNavbar />
      <h2>Frequently asked questions</h2>
      <SearchBar text="for questions" className="faqsearchbar" onSearch={handleSearch} />
      {filteredFaq.length === 0 ? (
        <p>There are no questions related to your search.</p>
      ) : (
        <section>
          <Accordion faqData={filteredFaq} reviewData={null} />
        </section>
      )}
    </div>
  );
}

export default Faq;
