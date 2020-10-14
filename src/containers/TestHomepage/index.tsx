import React, { useState, useEffect } from "react";
import client from '../../client';
import { GET_USER_BY_ID, GET_EVENTS_BY_MULTIPLE_LOCATION_IDS } from '../../apis/graphQL/queries/index';
import { User } from '../../interfaces/query.interface';

const Homepage: React.FunctionComponent = () => {

  const [sessionUser, setSessionUser] = useState<User>({
    id: null,
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  useEffect (() => {
  const user = client.readQuery({
    query: GET_USER_BY_ID,
    variables: {
      id: 1,
    },
  })
  setSessionUser(user.getUserbyId);

  // const sessionEvents = client.readQuery({
  //   query: GET_EVENTS_BY_MULTIPLE_LOCATION_IDS,
  //   variables: {
  //     id: [1,2],
  //   },
  // })
  // console.log('sessionEvents --->', sessionEvents);
  }, [])

  return (
    <>
      <p> Hello{sessionUser.id ? ` ${sessionUser.firstName}` : ''} </p>
    </>
  );
};

export default Homepage;