import React from 'react';
import "./index.style.scss";
import { userSearchDataVar } from '../../apolloclient/makevar'

interface LocationInfoProps {
  name: string;
  alerts: {}[];
  lastAlert: string;
  lastVisited: string;
}

const LocationInfo = ({ name, alerts, lastAlert, lastVisited }: LocationInfoProps): JSX.Element => {

  const data2 = userSearchDataVar();
  let lat = data2.latitude;
  let lng = data2.longitude;

  return (  
    <div className='container'>
      <div>
        <h1>Location Information</h1>
      </div>
      <div>
        <p>Name of location: <span>{name}</span></p>
        <p>Covid alerts: <span>{'test'}</span></p>
        <p>Date of last alert: <span>{lastAlert}</span></p>
        <p>Last visited: <span>{lastVisited}</span></p>
        <p>Longitude: <span>{lng}</span></p>
        <p>Latitude: <span>{lat}</span></p>
      </div>
    </div>
  );
}

export default LocationInfo;