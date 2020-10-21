import React from "react";
import { userAlertsVar } from '../../apolloclient/makevar'
import AlertItem from '../../components/AlertItem'

const Alerts: React.FunctionComponent = () => {
  
  const data = userAlertsVar();
  const dataToMap = [...data.confirmed, ...data.suspected, ...data.safe]
  
  return (
    <>
      <h2>Your Alerts</h2>
      {dataToMap.map(
        location=> 
          <AlertItem
            key={location.id}
            alertProps={location}
          />     
      )}
    </>
  );
};

export default Alerts;
