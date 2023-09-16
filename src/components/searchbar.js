import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'; // Assuming you are using React Bootstrap
import { BsSearch } from 'react-icons/bs'; // Import the magnifying glass icon
import './searchbar.css'; // Import your custom CSS file

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here, e.g., sending the search term to a backend API
    // You can also use props to pass the search results back to the parent component
    // For now, let's just log the search term
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className={`search-bar-container ${props.className || ''}`}>
      <Form inline onSubmit={handleSearch}>
        <InputGroup>
        
          <FormControl
            type="text"
            placeholder="Search"
            className="search-bar-input" // Apply the input style
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

