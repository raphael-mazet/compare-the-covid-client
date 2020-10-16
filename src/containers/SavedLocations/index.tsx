import React, { useEffect, useState } from "react";
import SavedLocationItem from '../../components/SavedLocationItem';
import { savedLocationsVar } from "../../apolloclient/makevar";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_EVENTS_BY_LOCATION_ID } from "../../apis/graphQL/queries";
import { Event, Location } from '../../interfaces/query.interface'
import { Console } from "console";

const SavedLocations: React.FunctionComponent = () => {
  
  //Trying to attach events to each user location and failing miserably

  let savedLocations = savedLocationsVar();
  const [getLocationEvents, eventData] = useLazyQuery(GET_EVENTS_BY_LOCATION_ID, {
    onCompleted: attachEventData
  })

  function attachEventData (eventData: any) {
    const locationsWithEvents = [...savedLocations]
    locationsWithEvents.forEach(location => {
      if ( eventData.getEventsbyLocation_Id[0].location_id.id === location.id) {
        //location.events = eventData.getEventsbyLocation_Id creates typescript non-extensible object error
        location = {...location, events: eventData.getEventsbyLocation_Id}
      }
    })
    savedLocationsVar(locationsWithEvents);
    savedLocations = savedLocationsVar();
  }

  useEffect(() => {
    savedLocations.forEach((location: Location)=>{
      getLocationEvents({
        variables: {
          location_id: location.id,
        }
      })
    })
  }, [])

  return (
    <div className='container'>
      {savedLocations.map(location=>
      <SavedLocationItem key={location.id} location={location}/>
      )}
    </div>
  );
};

export default SavedLocations;
