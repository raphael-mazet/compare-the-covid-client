import React, {useEffect, useState} from "react";
import SavedLocationItem from '../../components/SavedLocationItem';
import { authenticatedUserVar, savedLocationsVar, userAlertsVar } from "../../apolloclient/makevar";
import { Event } from '../../interfaces/query.interface'
import './index.style.scss';
import { useMutation } from "@apollo/react-hooks";
import { DELETE_SAVED_LOCATION } from '../../apis/graphQL/mutations';

const SavedLocations = (): JSX.Element => {
  const [events, setEventsCache] = useState<Event[]>();
  const savedLocations = savedLocationsVar();
  const updateLocations = () => {
    console.log('update locations')
  }
  const [deleteLocation] = useMutation(DELETE_SAVED_LOCATION, {
    onCompleted: updateLocations
  })

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
      console.log(event.location_id)
      if(location.id === event?.location_id.id) {
        location.events.push(event)
      }
    })
  });

  const sortedLocations = savedLocationsWithEvents && savedLocationsWithEvents.sort((a, b) => b.events.length - a.events.length);

  const deleteAction = (location_id: number) => {
    const authData = authenticatedUserVar();
    console.log(location_id, authData)
    deleteLocation({
      variables: {
        user_id: authData.id,
        location_id: location_id
      }
    });
  } 
  
  return (
    <div className='container'>
      <div style={{height: '100%'}}>
        {sortedLocations.map(location=>
          <SavedLocationItem
            key={location.id}
            location={location}
            onDelete={deleteAction}
          />
        )}
      </div>
    </div>
  );
};

export default SavedLocations;
