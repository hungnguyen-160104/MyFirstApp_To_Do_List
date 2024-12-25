import React from 'react';
import './SearchBar.css'; // Import CSS
import { Box } from '@mui/material';

const SearchBar = () => {
  return (
    <Box className="search-bar">
      <input type="text" className="search-input" placeholder="Tìm kiếm..." />
    </Box>
  );
};

export default SearchBar;
