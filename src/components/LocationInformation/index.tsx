import React from 'react';
import "./index.style.scss";
import { userSearchDataVar } from '../../apolloclient/makevar'
import { useReactiveVar } from '@apollo/client';

// interface LocationInfoProps {
//   name: string;
//   alerts: {}[];
//   lastAlert: string;
//   lastVisited: string;
// }

const LocationInfo = (): JSX.Element => {

  const data = useReactiveVar(userSearchDataVar)

  return (  
    <div className='container'>
      <div>
        <p>Name of location: <span>{data.name}</span></p>
        <p>Covid alerts: <span>{'static'}</span></p>
        <p>Date of last alert: <span>{'static'}</span></p>
        <p>Last visited: <span>{'static'}</span></p>
        <p>Longitude: <span>{data.longitude}</span></p>
        <p>Latitude: <span>{data.latitude}</span></p>
      </div>
    </div>
  );
}

export default LocationInfo;