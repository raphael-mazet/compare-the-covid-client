import React from 'react';
import "./index.style.scss";

interface LocationInfoProps {
  name: string;
  alerts: {}[];
  lastAlert: string;
  lastVisited: string;
}

const LocationInfo = ({ name, alerts, lastAlert, lastVisited }: LocationInfoProps): JSX.Element => (
  
  <div className='container'>
    <div>
      <h1>Location Information</h1>
    </div>
    <div>
      <p>Name of location: <span>{name}</span></p>
      <p>Covid alerts: <span>{'test'}</span></p>
      <p>Date of last alert: <span>{lastAlert}</span></p>
      <p>Last visited: <span>{lastVisited}</span></p>
    </div>
  </div>
);

export default LocationInfo;