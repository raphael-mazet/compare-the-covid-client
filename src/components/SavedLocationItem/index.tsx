import React from 'react';
// import "./index.style.scss";
// import { authenticatedUserVar } from '../../apolloclient/makevar'
// import { useReactiveVar } from '@apollo/client';
import { Location } from '../../interfaces/query.interface';

type propTypes = {
  location: Location
}

const SavedLocationItem = (props: propTypes): JSX.Element => {

  // const user_id = authenticatedUserVar()

  // console.log('userid',  user_id)
  console.log('props', props)

  return (  
    <div className='container'>
      <div>
        <h1>Saved Location Information</h1>
      </div>
      <div>
        <p>Name of location: <span>{props.location.name}</span></p>
        {/* <p>Covid alerts: <span>{'static'}</span></p> */}
        {/* <p>Date of last alert: <span>{'static'}</span></p> */}
        {/* <p>Last visited: <span>{'static'}</span></p> */}
        <p>Longitude: <span>{props.location.longitude}</span></p>
        <p>Latitude: <span>{props.location.latitude}</span></p>
      </div>
    </div>
  );
}

export default SavedLocationItem;