import React, { useEffect, useState } from "react";
import SavedLocationItem from '../../components/SavedLocationItem';
import { savedLocationsVar } from "../../apolloclient/makevar";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { GET_EVENTS_BY_LOCATION_ID, GET_USER_BY_ID } from "../../apis/graphQL/queries";
import { Event, Location } from '../../interfaces/query.interface'
import { Console } from "console";
import client from "../../client";

const SavedLocations: React.FunctionComponent = () => {
  
  //Trying to attach events to each user location and failing miserably


  let savedLocations = savedLocationsVar();
  
  // const[locationsWithEvents, setLocationsWithEvents] = useState(savedLocations)
  // const [getLocationEvents, eventData] = useLazyQuery(GET_EVENTS_BY_LOCATION_ID, {
  //   onCompleted: attachEventData
  // })

  
  // const res = client.readQuery({
  //   query: GET_USER_BY_ID,
  //   variables: {
  //     id: 10
  //   }
  // })
  
  // console.log('res', res)
  
  
  // console.log('locationdata', locationDataFromDB)

  const locationIdFromCache = client.readQuery({
    query: GET_EVENTS_BY_LOCATION_ID,
    variables: {
      location_id: 1
    }
  })

  console.log('locationIdFromCache', locationIdFromCache)
  

  useEffect(() => {
    console.log('savedLocations', savedLocations)
    // savedLocations.forEach(
    //   (location: Location)=>{
        // const res = client.readQuery({
        //   query: GET_EVENTS_BY_LOCATION_ID,
        //   variables: {
        //     location_id: location.id
        //   }
        // })
        // console.log('res', res)
    //   }
    // )
    //   getLocationEvents({
    //     variables: {
    //       location_id: location.id,
    //     }
    //   })
    // })
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


  // function attachEventData (eventData: any) {
  //   const locationsWithEvents = [...savedLocations]
  //   locationsWithEvents.forEach(location => {
  //     if ( eventData.getEventsbyLocation_Id[0].location_id.id === location.id) {
  //       //location.events = eventData.getEventsbyLocation_Id creates typescript non-extensible object error
  //       location = {...location, events: eventData.getEventsbyLocation_Id}
  //     }
  //   })
  //   savedLocationsVar(locationsWithEvents);
  //   savedLocations = savedLocationsVar();
  // }
