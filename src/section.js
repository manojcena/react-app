import React from 'react';
import Button from './Button';
function section(props) {
  return (
    <h3 className="text-color-white">{props.sectionDetails.type}
    <Button click={props.sectionDetails.click} name={props.sectionDetails.button1} type={props.sectionDetails.specificType === props.sectionDetails.button1 ? "button-color-red" : "button-color-hash"}></Button>
    <Button click={props.sectionDetails.click} name={props.sectionDetails.button2} type={props.sectionDetails.specificType === props.sectionDetails.button2 ? "button-color-red" : "button-color-hash"}></Button>
  </h3>
  );
}

export default section;
