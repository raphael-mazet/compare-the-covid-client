import React from 'react';
// import "./index.style.scss";
import { authenticatedUserVar } from '../../apolloclient/makevar'
import { useReactiveVar } from '@apollo/client';

// interface LocationInfoProps {
//   name: string;
//   alerts: {}[];
//   lastAlert: string;
//   lastVisited: string;
// }

const SavedLocationItem = (): JSX.Element => {

  const user_id = authenticatedUserVar()

  console.log(user_id)

  return (  
    <div className='container'>
      <div>
        <h1>Saved Location Information</h1>
      </div>
      <div>
        {/* <p>Name of location: <span>{data.name}</span></p>
        <p>Covid alerts: <span>{'static'}</span></p>
        <p>Date of last alert: <span>{'static'}</span></p>
        <p>Last visited: <span>{'static'}</span></p>
        <p>Longitude: <span>{data.longitude}</span></p>
        <p>Latitude: <span>{data.latitude}</span></p> */}
      </div>
    </div>
  );
}

export default SavedLocationItem;