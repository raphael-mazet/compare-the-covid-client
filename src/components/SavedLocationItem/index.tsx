import React, { FormEvent, useState } from 'react';
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
  onDelete: (e: any) => any;
  className?: string;
}

const SavedLocationItem = (props: propTypes): JSX.Element => {

  const [className, setClassName] = useState<string>('');

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

  console.log(props.location)

  const alertScore = props.location.events?.map(event=> event.alertScore);
  const eventsNumber = props.location.events && props.location.events.length
  const totalScore = (Number(eventsNumber) > 1) ? alertScore?.reduce((acc, cv) => Number(acc) + Number(cv)) : alertScore;
  const averageScore = Number(totalScore)/Number(eventsNumber)

  const latestEvent = findLatest(props.location.events)
  const formattedDate = DateTime.fromISO(latestEvent.created_at).toFormat('dd LLL yyyy');

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

  const startAnimation = () => {
    setClassName('animation');
  }

  const registerDelete = () => {
    props.onDelete(props.location.id);
  }

  const closeIconclickHandler = (e: FormEvent) => {
    e.preventDefault();
    startAnimation();
    onanimationend = () => {
      registerDelete();
    }
  }

  return (  
    <div className={["location_container_wrapper", className].join(' ')}>
      <div className={['location-container', alertZone].join(' ')} >
        <CloseIcon clickHandler={(e)=>closeIconclickHandler(e)}/>
        <div className="location_container_clickable" onClick={clickHandler}>
        </div>
        <span>{props.location.name}</span>
        <div className="location_data_container">
          <p> <span>Alerts #</span><br/> {props.location.events?.length}</p>
          <p> <span>Last Alert</span><br/> {latestEvent.created_at ? formattedDate : 'No events'}</p>
          <p> <span>Sanitary rating</span><br/> {averageScore}</p>
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
    </div>
  );
}

export default SavedLocationItem;