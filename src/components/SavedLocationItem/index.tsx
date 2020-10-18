import React from 'react';
import { Location } from '../../interfaces/query.interface';
import { useHistory } from 'react-router-dom';
import {selectedLocationsEventsVar} from "../../apolloclient/makevar"; 

type propTypes = {
  location: Location
}

const SavedLocationItem = (props: propTypes): JSX.Element => {

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

  const history = useHistory();
  const clickHandler = async () => {
    await selectedLocationsEventsVar({location: props.location})
    history.push('/locationalerts');
  }

  return (  
    <div className='container'>
      <div>
        <h1>Saved Location Information</h1>
      </div>
      <div>
        <p>Name of location: <span>{props.location.name}</span></p>
        <p style={{cursor:'pointer'}} onClick={clickHandler}>Total covid alerts: {props.location.events?.length}</p>
        <p>Date of last alert: {latestEvent.created_at}</p>
        {/* <p>Last visited: <span>{'static'}</span></p> */}
        <p>Longitude: <span>{props.location.longitude}</span></p>
        <p>Latitude: <span>{props.location.latitude}</span></p>
      </div>
    </div>
  );
}

export default SavedLocationItem;