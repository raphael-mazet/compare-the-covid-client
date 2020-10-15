import React, { useState, useEffect } from "react";
import { gql, useQuery } from '@apollo/client';
import client from '../../client';
import { GET_USER_BY_ID, GET_EVENTS_BY_MULTIPLE_LOCATION_IDS, USER_ALERTS, GET_LOGGED_USER_ID } from '../../apis/graphQL/queries/index';
import { User } from '../../interfaces/query.interface';

const Homepage: React.FunctionComponent = () => {

const {data: idData} = useQuery<any>(GET_LOGGED_USER_ID);

const {data: userData} = useQuery<{getUserbyId: User}>(GET_USER_BY_ID, {
  variables: {
    id: idData.loggedUserId
  }
})

const userAlerts = client.readQuery({
  query: USER_ALERTS,
})

  return (
    <>
      <p> Hello{userData ? ` ${userData.getUserbyId.firstName}` : ''} </p>
      <p>You have {`${userAlerts.greenAlerts.length} green, ${userAlerts.yellowAlerts.length} yellow, ${userAlerts.redAlerts.length} red`}</p>
    </>
  );
};

export default Homepage;