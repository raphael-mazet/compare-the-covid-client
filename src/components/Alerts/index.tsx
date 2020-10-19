import React, { useState, useEffect } from "react";
import CircleItem from "./CircleItem/index";
import "./index.style.scss";
import { userAlertsVar, authenticatedUserVar } from '../../apolloclient/makevar'
import { log } from "console";
import { UserAlerts } from "../../apolloclient/localstateinterfaces";
import { Event } from '../../interfaces/query.interface'
import filterActiveAndNew from "../../helpers/filterActiveAndNew";


const Alerts: React.FunctionComponent = (): JSX.Element => {
  
  const userAlerts = userAlertsVar();

  const filteredAlerts = filterActiveAndNew(userAlerts);
  console.log('filteredAlerts ---> ', filteredAlerts);

  return (
    <div className='alertContainer'>
      <div>
        <h2> Covid Alerts</h2>
      </div>
      <CircleItem
        alerts={filteredAlerts}
      />
      {/* {noNewAlerts ? (
        <p>You have no new alerts. Save some locations and get alerted.</p>
      ) : null} */}
    </div>
  );
};

export default Alerts;
