import React, { useState } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { User, SavedLocations, SavedLocationsArray, Event } from '../../interfaces/query.interface';
import { GET_USER_BY_ID, GET_SAVED_LOCATION_BY_USER_ID, GET_EVENTS_BY_MULTIPLE_LOCATION_IDS } from '../../apis/graphQL/queries/index';
import client from '../../client';


const TestLogin: React.FunctionComponent = () => {

const {data: userData} = useQuery<{getUserbyId: User}>(GET_USER_BY_ID, {
  variables: {
    id:1
  }
})

useQuery<{getSavedLocationbyUser_Id: SavedLocationsArray}>(GET_SAVED_LOCATION_BY_USER_ID, {
  variables: {
    user_id:1
  },
  onCompleted: getLocationEvents
})

const [getEvents, {data: eventData}] = useLazyQuery<{getEventsbyMulitpleLocationIds: [Event]}>(GET_EVENTS_BY_MULTIPLE_LOCATION_IDS)

function getLocationEvents (locationData: {getSavedLocationbyUser_Id: SavedLocationsArray}) {
  const locationIds: (number | null)[] = [];
  locationData?.getSavedLocationbyUser_Id.forEach((location: SavedLocations) => {
    locationIds.push(location.location_id.id)
  })
  getEvents({
    variables: {
      location_ids: locationIds
    }
  })
}

// console.log('userData ---> ', userData)
// console.log('userEvents --->', eventData)

// const sessionUser = client.readQuery({
//   query: GET_USER_BY_ID,
//   variables: {
//     id: 1,
//   },
// })
// console.log('sessionUser --->', sessionUser);

console.log('eventData -->', eventData);


// getEvents({
//   variables: {
//     location_ids: [1,2]
//   }
// })

// const sessionEvents = client.readQuery({
//   query: GET_EVENTS_BY_MULTIPLE_LOCATION_IDS,
//   variables: {
//     id: [1,2],
//   },
// })
// console.log('sessionEvents --->', sessionEvents);



return (
  <>Hello</>
  )
  
}

export default TestLogin;
