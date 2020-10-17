import React from 'react';
// import "./index.style.scss";
// import { authenticatedUserVar } from '../../apolloclient/makevar'
// import { useReactiveVar } from '@apollo/client';
import { Location } from '../../interfaces/query.interface';

type propTypes = {
  location: Location
}

const SavedLocationItem = (props: propTypes): JSX.Element => {

  // previous: 2020-09-10T19:38:33.912Z / starbucks(id1)



  function findLatest (eventsArr: any) {
    let res: any = {};
    eventsArr.forEach((event: any) => {
      if (res.created_at) {
        if (event.created_at >= res.created_at) {
          res = event
        }
      }
      else res = event
    })
    return res;
  }

  const latestEvent = findLatest(props.location.events)
  // const user_id = authenticatedUserVar()

  // console.log('userid',  user_id)
  // console.log('props', props)
  // console.log

  return (  
    <div className='container'>
      <div>
        <h1>Saved Location Information</h1>
      </div>
      <div>
        <p>Name of location: <span>{props.location.name}</span></p>
        <p>Total covid alerts: {props.location.events?.length}</p>
        <p>Date of last alert: {latestEvent.created_at}</p>
        {/* <p>Last visited: <span>{'static'}</span></p> */}
        <p>Longitude: <span>{props.location.longitude}</span></p>
        <p>Latitude: <span>{props.location.latitude}</span></p>
      </div>
    </div>
  );
}

export default SavedLocationItem;