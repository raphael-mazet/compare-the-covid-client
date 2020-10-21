import React from "react";
import './index.style.scss';
import { selectedLocationsEventsVar, userAlertsVar } from "../../apolloclient/makevar";
import { Event } from '../../interfaces/query.interface'
import { DateTime } from 'luxon';

const alertItem = (props: any): JSX.Element => {
  const {
    alertProps,
    callbackLocationAlerts
  } = props;

  const formattedAlert = alertProps.alertType.charAt(0).toUpperCase() + alertProps.alertType.slice(1)
  const formattedDate = DateTime.fromISO(alertProps.created_at).toFormat('dd LLL yyyy');
  
  return (
    <div className="alertItemContainer" onClick={() => callbackLocationAlerts(alertProps.location_id)}>
      <p className={formattedAlert}>Alert: {formattedAlert}</p>
      <p>Created on: {formattedDate}</p>
      <p>Sanitary rating: {alertProps.alertScore}</p>
      <p>Location: {alertProps.location_id.name}</p>
    </div>
  );
};

export default alertItem;