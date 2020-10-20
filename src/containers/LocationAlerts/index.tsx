import React from "react";
import {selectedLocationsEventsVar} from "../../apolloclient/makevar"; 
import AlertItem from '../../components/AlertItem'

const Alerts: React.FunctionComponent = () => {
  
  const data: any = selectedLocationsEventsVar()
  
  const dataArray: any = data.location.events

  return (
    <>
      <h1>{data.location.name}</h1>
      {dataArray.map(
        (event:any)=> 
          <AlertItem
            key={event.id}
            alertProps={event}
          />     
      )}
    </>
  );
};

export default Alerts;
