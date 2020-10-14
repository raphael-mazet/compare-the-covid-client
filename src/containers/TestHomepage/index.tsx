import React, { useState, useEffect } from "react";
import client from '../../client';
import { GET_USER_BY_ID, GET_EVENTS_BY_MULTIPLE_LOCATION_IDS } from '../../apis/graphQL/queries/index';
import { User, Event } from '../../interfaces/query.interface';

const Homepage: React.FunctionComponent = () => {

  const [sessionUser, setSessionUser] = useState<User>({
    id: null,
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  const [sessionEvents, setSessionEvents] = useState<any>({
    green: [],
    yellow: [],
    red: []
  })

  useEffect (() => {
  const user = client.readQuery({
    query: GET_USER_BY_ID,
    variables: {
      id: 1,
    },
  })
  setSessionUser(user.getUserbyId);

  const events = client.readQuery({
    query: GET_EVENTS_BY_MULTIPLE_LOCATION_IDS,
    variables: {
      location_ids: [1,2,3,4],
    },
  })

  
    const tempEvents: any = {
      green: [],
      yellow: [],
      red: []
    }
  events.getEventsbyMultipleLocationIds.forEach((event: Event) => {
    if (event.alertType === 'confirmed') {
      tempEvents.red.push(event)
    } else if (event.alertType === 'suspected') {
      tempEvents.yellow.push(event)
    } else if (event.alertType === 'safe') {
      tempEvents.green.push(event)
    }
  })
  setSessionEvents(tempEvents)
  }, [])

  return (
    <>
      <p> Hello{sessionUser.id ? ` ${sessionUser.firstName}` : ''} </p>
      <p>You have {`${sessionEvents.green.length} green, ${sessionEvents.yellow.length} yellow, ${sessionEvents.red.length} red`}</p>
    </>
  );
};

export default Homepage;