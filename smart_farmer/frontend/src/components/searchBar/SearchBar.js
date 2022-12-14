import React from 'react';

const SearchBar = ({keyword,setKeyword}) => {
  const BarStyling = {width:"30rem",background:"#F2F1F9", border:"bold", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     value={keyword}
     placeholder={"search"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar