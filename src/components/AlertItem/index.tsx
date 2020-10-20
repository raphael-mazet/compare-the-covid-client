import React from "react";
import './index.style.scss';

const alertItem = ({ alertProps }: any): JSX.Element | null => {
  
  return (
    <div className="alertItemContainer">
      <p>Test</p>
      <p>Type: {alertProps.alertType}</p>
      <p>Score: {alertProps.alertScore}</p>
      <p>Created: {alertProps.created_at}</p>
      <p>Country: {alertProps.location_id.country}</p>
      <p>Location Name: {alertProps.location_id.name}</p>
    </div>
  );
};

export default alertItem;