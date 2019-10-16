import React from 'react';

function SearchBox(props) {
  return (
   <input ref = {props.ref}className="search" type="text" placeholder="search any movie"/>
  );
}

export default SearchBox;
