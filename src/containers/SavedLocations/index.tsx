import React, {useEffect, useState} from "react";
import SavedLocationItem from '../../components/SavedLocationItem';
import { savedLocationsVar, userAlertsVar } from "../../apolloclient/makevar";
import { Event } from '../../interfaces/query.interface'
import './index.style.scss';

const SavedLocations = (): JSX.Element => {
  const [events, setEventsCache] = useState<Event[]>();
  const savedLocations = savedLocationsVar();

  const savedLocationsWithEvents = savedLocations.map((location) =>
    Object.assign({}, location, { events: [] })
  );
  useEffect(() => {
    const cachedEvents = userAlertsVar();
    const dataToMap = [...cachedEvents.confirmed, ...cachedEvents.suspected, ...cachedEvents.safe]
    setEventsCache(dataToMap);
  }, [])

  events && events.forEach((event: any )=> {
    savedLocationsWithEvents.forEach(location => {
      if(location.id === event?.location_id?.id) {
        location.events.push(event)
      }
    })
  });

  const sortedLocations = savedLocationsWithEvents && savedLocationsWithEvents.sort((a, b) => b.events.length - a.events.length);

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
