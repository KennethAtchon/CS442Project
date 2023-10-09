import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'; // Assuming you are using React Bootstrap
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs'; // Import the magnifying glass icon
import './searchbar.css'; // Import your custom CSS file

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm)
    if (props.onSearch) {
      props.onSearch(searchTerm); // Call the onSearch prop with the search term
    }else if(props.productSearch){
      navigate(`/products?search=${searchTerm}`);
    }
  };

  return (    
    <div className={`search-bar-container ${props.className || ''}`}>
      <Form inline onSubmit={handleSubmit}>
        <InputGroup>
        
          <FormControl
            type="text"
            placeholder={`Search ${props.text || 'for products'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
         
            <Button variant="outline-success" type="submit">
              <BsSearch /> {/* Magnifying glass icon */}
            </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default SearchBar;

