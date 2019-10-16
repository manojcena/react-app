import React from 'react';

function Button(props) {
  return (
   <button className={"sort-button " + props.type} onClick={ () => props.click(props.name)}>{props.name}</button>
  );
}

export default Button;
