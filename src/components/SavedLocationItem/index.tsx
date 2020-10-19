import React from 'react';
import { Location } from '../../interfaces/query.interface';
import { useHistory } from 'react-router-dom';
import {selectedLocationsEventsVar} from "../../apolloclient/makevar"; 
import './index.style.scss';
import moment from 'moment';
import Map from '../GoogleMap';

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
  // <p>Longitude: <span>{props.location.longitude}</span></p>
  // <p>Latitude: <span>{props.location.latitude}</span></p>
  let alertZone = 'safe';
  if (props.location.events && props.location.events?.length > 5 && props.location.events?.length < 10) {
    alertZone = 'mid';
  } else if (props.location.events && props.location.events?.length > 10) {
    alertZone = 'high';
  }
  return (  
    <div className={['location-container', alertZone].join(' ')} onClick={clickHandler}>
      <div>
        <span style={{ fontWeight: 'bold' }}>{props.location.name}</span>
        <div className='location_map_container'> 
          <Map
            latitude={0}
            longitude={0}
          />
        </div>
        <div className="location_data_container">
          <p> Alerts: {props.location.events?.length}</p>
          <p>Last: {latestEvent.created_at ? latestEvent.created_at : moment().format("MMM Do YY")}</p>
        </div>
      </div>
    </div>
  );
}

export default SavedLocationItem;