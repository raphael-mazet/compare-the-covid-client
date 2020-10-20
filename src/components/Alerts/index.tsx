import React from "react";
import CircleItem from "./CircleItem/index";
import "./index.style.scss";
import { savedLocationsVar, userAlertsVar } from '../../apolloclient/makevar'
import filterActiveAndNew from "../../helpers/filterActiveAndNew";

const Alerts: React.FunctionComponent = (): JSX.Element => {
  
  const userAlerts = userAlertsVar();
  const userLocations = savedLocationsVar();
  const filteredAlerts = filterActiveAndNew(userAlerts);

  return (
    <div className='alertContainer'>
      <CircleItem
        alerts={filteredAlerts}
      />
      {!userLocations.length ? (
        <p>You are not following any locations. Save some below to get alerted.</p>
      ) : null}
    </div>
  );
};

export default Alerts;
