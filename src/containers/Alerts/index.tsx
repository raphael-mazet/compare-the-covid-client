import React, {useEffect, useState} from "react";
import { userAlertsVar, selectedLocationsEventsVar } from '../../apolloclient/makevar'
import AlertItem from '../../components/AlertItem'
import { useHistory } from 'react-router-dom';
import './index.style.scss'

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

  const alertsShown = alerts && alerts.filter((alert:any)=>(alert.expires_on > new Date().toISOString()))

  return (
    <>
      <h2>Your Alerts</h2>
      {alertsShown && alertsShown.map(
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
