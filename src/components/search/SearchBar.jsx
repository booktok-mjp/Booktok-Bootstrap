import React, { useState } from 'react';
import { GiArchiveResearch } from 'react-icons/gi';
import { SlMagnifierRemove } from 'react-icons/sl';

import { Colors } from '../../config';
import './SearchBar.css';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

const SearchBar = ({ placeholder, onSearch, allBooks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchWord, setShowSearchWord] = useState(false);

  const handleSearch = (e) => {
    setShowSearchWord(false);
    e.preventDefault();

    const filteredArr = allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        book.author_name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    onSearch(filteredArr);
    setShowSearchWord(true);
  };

  const handleRemoveFilter = (e) => {
    e.preventDefault();
    onSearch(allBooks);
    setSearchTerm('');
    setShowSearchWord(false);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Remove filter
    </Tooltip>
  );

  return (
    <>
      <form className="search-bar mb-5" onSubmit={handleSearch}>
        <div className="input-container">
          <GiArchiveResearch fontSize="40px" color={Colors.wineRed} />
          <input
            type="text"
            placeholder={placeholder || 'Search books and authors...'}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSearchWord(false);
            }}
            className="search-input"
          />
        </div>
        {showSearchWord && searchTerm !== '' && (
          <OverlayTrigger placement="left" overlay={renderTooltip}>
            <Badge
              className="mx-2"
              pill
              as="button"
              bg="dark"
              onClick={handleRemoveFilter}
            >
              {searchTerm} <SlMagnifierRemove fontSize={15} />
            </Badge>
          </OverlayTrigger>
        )}
        <button type="submit" className="search-btn" color={Colors.wineRed}>
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
