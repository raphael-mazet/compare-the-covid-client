import React from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { User, SavedLocations, SavedLocationsArray, Event } from '../../interfaces/query.interface';
import {
  GET_USER_BY_ID,
  GET_SAVED_LOCATION_BY_USER_ID,
  GET_EVENTS_BY_MULTIPLE_LOCATION_IDS,
  GET_LOGGED_USER_ID,
  USER_ALERTS
} from '../../apis/graphQL/queries/index';
import client from '../../client';

const TestLogin: React.FunctionComponent = () => {

//TODO: typescript
const {data: idData} = useQuery<any>(GET_LOGGED_USER_ID);

const {data: userData} = useQuery<{getUserbyId: User}>(GET_USER_BY_ID, {
  variables: {
    id: idData.loggedUserId
  }
})

useQuery<{getSavedLocationbyUser_Id: SavedLocationsArray}>(GET_SAVED_LOCATION_BY_USER_ID, {
  variables: {
    user_id: idData.loggedUserId
  },
  onCompleted: getLocationEvents
})

const [getEvents] = useLazyQuery<{getEventsbyMulitpleLocationIds: [Event]}>(GET_EVENTS_BY_MULTIPLE_LOCATION_IDS, {
  onCompleted: setAlerts
})

function getLocationEvents (locationData: {getSavedLocationbyUser_Id: SavedLocationsArray}) {
  const locationIds: (number | null)[] = [];
  locationData.getSavedLocationbyUser_Id.forEach((location: SavedLocations) => {
    locationIds.push(location.location_id.id)
  })
  getEvents({
    variables: {
      location_ids: locationIds
    }
  })
}

function setAlerts (eventData: any) {
  
  const tempEvents: any = {
    green: [],
    yellow: [],
    red: []
  }

  eventData.getEventsbyMultipleLocationIds.forEach((event: Event) => {
    if (event.alertType === 'confirmed') {
      tempEvents.red.push(event)
    } else if (event.alertType === 'suspected') {
      tempEvents.yellow.push(event)
    } else if (event.alertType === 'safe') {
      tempEvents.green.push(event)
    }
  })

  client.writeQuery({
    query: USER_ALERTS,
    data: {
      greenAlerts: tempEvents.green,
      yellowAlerts: tempEvents.yellow,
      redAlerts: tempEvents.red
    } 
  });
}

return (
  <>Hello
  </>
  )
  
}

export default TestLogin;
