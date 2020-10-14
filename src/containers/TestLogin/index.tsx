import React, { useState } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { User, SavedLocations, SavedLocationsArray, Event } from '../../interfaces/query.interface';
import { GET_USER_BY_ID, GET_SAVED_LOCATION_BY_USER_ID, GET_EVENTS_BY_MULTIPLE_LOCATION_IDS } from '../../apis/graphQL/queries/index';


const TestLogin: React.FunctionComponent = () => {
  
const [userLocations, setUserLocations] = useState<(number | null)[]>([]);

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
  setUserLocations(locationIds)
  getEvents({
    variables: {
      location_ids: locationIds
    }
  })
}

console.log('userLocations --> ', userLocations)
console.log('userData ---> ', userData)
console.log('userEvents --->', eventData)

return (
  <>Hello</>
  )
  
}

export default TestLogin;
