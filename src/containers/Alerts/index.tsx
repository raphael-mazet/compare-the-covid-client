import React from "react";
import { userAlertsVar } from '../../apolloclient/makevar'
import AlertItem from '../../components/AlertItem'

const Alerts: React.FunctionComponent = () => {
  
  const data = userAlertsVar();
  let dataToMap = [...data.confirmed, ...data.suspected, ...data.safe]

  return (
    <>
      <h1>Your Alerts</h1>
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
