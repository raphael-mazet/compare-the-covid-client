import React, {useEffect, useState} from "react";
import SavedLocationItem from '../../components/SavedLocationItem';
import { savedLocationsVar, userAlertsVar } from "../../apolloclient/makevar";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_EVENTS_BY_MULTIPLE_LOCATION_IDS } from "../../apis/graphQL/queries";
import './index.style.scss';

const SavedLocations: any = () => {
  const [events, setEventsCache] = useState<any>();
  const savedLocations = savedLocationsVar();

  const savedLocationsWithEvents = savedLocations.map((location) => 
    Object.assign({}, location, {events:[]})
  );
  useEffect(() => {
    console.log('getEvents')
    getEvents();
    const cachedEvents = userAlertsVar();
    setEventsCache(cachedEvents);

  },[])
  const locationIds = savedLocations.map(location => location.id);

  const [getEvents, {data: allUserEvents}] = useLazyQuery(GET_EVENTS_BY_MULTIPLE_LOCATION_IDS, {
    variables: {
      location_ids: locationIds
    }
  });

  allUserEvents && allUserEvents.getEventsbyMultipleLocationIds.forEach((event:any )=> {
    savedLocationsWithEvents.forEach(location => {
      if(location.id === event.location_id.id) {
        location.events.push(event)
      }
    })
  });

  const sortedLocations = savedLocationsWithEvents && savedLocationsWithEvents.sort((a, b) => b.events.length - a.events.length);
  console.log(events)
  return (
    <div className='container'>
      <div style={{height: '100%'}}>
        {sortedLocations.map(location=>
          <SavedLocationItem
            key={location.id}
            location={location}
          />
        )}
      </div>
    </div>
  );
};

export default SavedLocations;
