import React from 'react';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import SearchBar from '../../components/searchbar';
import Accordion from '../../components/accordion'
import './Faq.css'

function Faq() {
  return (
    <div>
      <AppNavbar /> 
      <h2>Frequently asked questions</h2>
      < SearchBar text="for questions" className="faqsearchbar"/>      
      <section>
      < Accordion key="2"/>
      </section>

    </div>
  );
}

export default Faq;
