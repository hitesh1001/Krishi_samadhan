import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase, styled} from '@mui/material';

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 38%;
  background-color: #fff;
  display: flex;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;

const Search = () => {
  return (
    <SearchContainer>
        <InputBase />
        <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
    </SearchContainer>
    
  )
}

export default Search;