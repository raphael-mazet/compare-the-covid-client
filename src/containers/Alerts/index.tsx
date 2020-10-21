import React, {useEffect, useState} from "react";
import { userAlertsVar, selectedLocationsEventsVar } from '../../apolloclient/makevar'
import AlertItem from '../../components/AlertItem'
import { useHistory } from 'react-router-dom';

const Alerts: React.FunctionComponent = () => {
  const [alerts, setAlerts] = useState<any>();

  useEffect(() => {
    const data = userAlertsVar();
    const dataToMap = [...data.confirmed, ...data.suspected, ...data.safe]
    setAlerts(dataToMap);
  },[]);
  
  const history = useHistory();

  const routeCallback = async (locationData: any) => {
    const events:any = [];
    alerts && alerts.forEach((event: any) => {
      if (locationData.id === event?.location_id.id) {
        events.push(event)
      }
    });
    const location = { ...locationData, events: [...events] };
    await selectedLocationsEventsVar({ location: location});
    history.push('/locationalerts');
  }

  return (
    <>
      <h1>Your Alerts</h1>
      {alerts && alerts.map(
        (location:any)=> 
          <AlertItem
            key={location.id}
            alertProps={location}
            callbackLocationAlerts={(data:any) => routeCallback(data)}
          />     
      )}
    </>
  );
};

export default Alerts;
