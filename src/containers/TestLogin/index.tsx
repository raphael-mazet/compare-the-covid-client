import React, { useState } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { User, SavedLocations, SavedLocationsArray, Event } from '../../interfaces/query.interface';
import { GET_USER_BY_ID, GET_SAVED_LOCATION_BY_USER_ID, GET_EVENTS_BY_MULTIPLE_LOCATION_IDS, GET_LOGGED_USER } from '../../apis/graphQL/queries/index';
import client from '../../client';
import Input from '../../components/Forms/Input';


const TestLogin: React.FunctionComponent = () => {

//TODO: typescript
const {data: loggedUserId} = useQuery<any>(GET_LOGGED_USER);
console.log('logged user id', loggedUserId)

const {data: userData} = useQuery<{getUserbyId: User}>(GET_USER_BY_ID, {
  variables: {
    id: loggedUserId.loggedUserId
  }
})

useQuery<{getSavedLocationbyUser_Id: SavedLocationsArray}>(GET_SAVED_LOCATION_BY_USER_ID, {
  variables: {
    user_id: loggedUserId.loggedUserId
  },
  onCompleted: getLocationEvents
})

const [getEvents, {data: eventData, loading: eventLoading}] = useLazyQuery<{getEventsbyMulitpleLocationIds: [Event]}>(GET_EVENTS_BY_MULTIPLE_LOCATION_IDS)

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
  <>Hello
  </>
  )
  
}

export default TestLogin;
