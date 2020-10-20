import React from "react";
import SavedLocationItem from '../../components/SavedLocationItem';
import { savedLocationsVar } from "../../apolloclient/makevar";
import { useQuery } from "@apollo/react-hooks";
import { GET_EVENTS_BY_MULTIPLE_LOCATION_IDS } from "../../apis/graphQL/queries";
import './index.style.scss';

const SavedLocations: any = () => {
  
  const savedLocations = savedLocationsVar();

  const savedLocationsWithEvents = savedLocations.map((location) => 
    Object.assign({}, location, {events:[]})
  );

  const locationIds = savedLocations.map(location => location.id);

  const {data: allUserEvents} = useQuery(GET_EVENTS_BY_MULTIPLE_LOCATION_IDS, {
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

  return (
    <div className='container'>
      <div style={{height: '100%'}}>
        {savedLocationsWithEvents.map(location=>
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
