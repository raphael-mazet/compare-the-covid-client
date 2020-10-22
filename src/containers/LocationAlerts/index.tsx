import React, {useEffect, useState} from "react";
import {selectedLocationsEventsVar} from "../../apolloclient/makevar"; 
import AlertItem from '../../components/AlertItem'

const Alerts: React.FunctionComponent = () => {
  const [alerts, setAlerts] = useState<any>();
  useEffect(() => {
    const data: any = selectedLocationsEventsVar()
    setAlerts(data)
  }, []);
  
  const dataArray: any = alerts?.location?.events

  return (
    <div>
      {alerts && 
        <>
        <h1>{alerts.location.name}</h1>
        {dataArray && dataArray.map(
          (event:any)=> 
            <AlertItem
              key={event.id}
              alertProps={event}
              callbackLocationAlerts={()=> null}
            />     
        )}
        </>
      }
    </div>
  );
};

export default Alerts;
