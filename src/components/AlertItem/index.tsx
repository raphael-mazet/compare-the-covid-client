import React from "react";
import './index.style.scss';
import { DateTime } from 'luxon';

const alertItem = ({ alertProps }: any): JSX.Element | null => {
  
  const formattedAlert = alertProps.alertType.charAt(0).toUpperCase() + alertProps.alertType.slice(1)
  const formattedDate = DateTime.fromISO(alertProps.created_at).toFormat('dd LLL yy')

  return (
    <div className="alertItemContainer">
      <p className={formattedAlert}>Alert: {formattedAlert}</p>
      <p>Created on: {formattedDate}</p>
      <p>Sanitary rating: {alertProps.alertScore}</p>
    </div>
  );
};

export default alertItem;