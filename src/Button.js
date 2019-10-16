import React from 'react';

function Button(props) {
  return (
   <button className={props.type}>{props.name}</button>
  );
}

export default Button;
