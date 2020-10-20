import React from 'react';
import { Location } from '../../interfaces/query.interface';
import { useHistory } from 'react-router-dom';
import {selectedLocationsEventsVar} from "../../apolloclient/makevar"; 
import './index.style.scss';
import GoogleMap from '../GoogleMap';
import { DateTime } from 'luxon';
import { greyStyle } from '../../helpers/mapstylesetting'
import CloseIcon from '../CloseIcon'

type propTypes = {
  location: Location
}

const SavedLocationItem = (props: propTypes): JSX.Element => {

  function findLatest (eventsArr: any) {
    let res: any = {};
    eventsArr.forEach((event: any) => {
      if (res.created_at) {
        if (event.created_at >= res.created_at) {
          res = event;
        }
      }
      else res = event;
    })
    return res;
  }

  const latestEvent = findLatest(props.location.events)
  const formattedDate = DateTime.fromISO(latestEvent.created_at).toFormat('dd LLL yy');

  const history = useHistory();
  const clickHandler = async () => {
    await selectedLocationsEventsVar({location: props.location})
    history.push('/locationalerts');
  }
  let alertZone = 'safe';
  if (props.location.events && props.location.events?.length > 5 && props.location.events?.length < 10) {
    alertZone = 'mid';
  } else if (props.location.events && props.location.events?.length > 10) {
    alertZone = 'high';
  }
  
  const mapZoomSetting = 12;

  return (  
    <div className={['location-container', alertZone].join(' ')} >
      <CloseIcon/>
      <div className="location_container_clickable" onClick={clickHandler}>
      </div>
        <span style={{ fontWeight: 'bold' }}>{props.location.name}</span>
        <div className="location_data_container">
          <p> <span>Alerts:</span> {props.location.events?.length}</p>
          <p> <span>Last event:</span> {latestEvent.created_at ? formattedDate : 'No events'}</p>
        </div>
        <div className='location_map_container'> 
          <GoogleMap
            latitude={props.location.latitude}
            longitude={props.location.longitude}
            markerSelectedAction={()=> null}
            zoom={mapZoomSetting}
            style={greyStyle}
          />
        </div>
      </div>
  );
}

export default SavedLocationItem;