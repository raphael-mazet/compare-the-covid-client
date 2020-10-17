import React from "react";
import SavedLocationItem from '../../components/SavedLocationItem';
import { savedLocationsVar } from "../../apolloclient/makevar";
import { useQuery } from "@apollo/react-hooks";
import { GET_EVENTS_BY_MULTIPLE_LOCATION_IDS } from "../../apis/graphQL/queries";

const SavedLocations: React.FunctionComponent = () => {
  
  const savedLocations = savedLocationsVar();
  let savedLocationsWithEvents = savedLocations.map((location) => 
    Object.assign({}, location, {events:[]})
  )
  const locationIds = savedLocations.map(location => location.id);
  const {data: allUserEvents} = useQuery(GET_EVENTS_BY_MULTIPLE_LOCATION_IDS, {
    variables: {
      location_ids: locationIds
    }
  })

  allUserEvents.getEventsbyMultipleLocationIds.forEach((event:any )=> {
    savedLocationsWithEvents.forEach(location => {
      if(location.id === event.location_id.id) {
        location.events.push(event)
      }
    })
  })

  return (
    <div className='container'>
      {savedLocationsWithEvents.map(location=>
      <SavedLocationItem key={location.id} location={location}/>
      )}
    </div>
  );
};

export default SavedLocations;
