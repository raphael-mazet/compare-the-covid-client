import React, { useEffect, useState } from "react";
import SavedLocationItem from '../../components/SavedLocationItem';
import { savedLocationsVar } from "../../apolloclient/makevar";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { GET_EVENTS_BY_LOCATION_ID, GET_USER_BY_ID, GET_EVENTS_BY_MULTIPLE_LOCATION_IDS } from "../../apis/graphQL/queries";
import { Event, Location } from '../../interfaces/query.interface'
import { Console } from "console";
import client from "../../client";

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
        location?.events?.push(event)
      }
    })
  })
console.log('savedLocationsAfterLoop', savedLocationsWithEvents)

  return (
    <div className='container'>
      {savedLocations.map(location=>
      <SavedLocationItem key={location.id} location={location}/>
      )}
    </div>
  );
};

export default SavedLocations;
