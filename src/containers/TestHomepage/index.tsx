import React from "react";
import client from '../../client';
import { USER_ALERTS } from '../../apis/graphQL/queries/index';

const Homepage: React.FunctionComponent = () => {

const userAlerts = client.readQuery({
  query: USER_ALERTS,
})

  return (
    <>
      <p>You have {`${userAlerts.greenAlerts.length} green, ${userAlerts.yellowAlerts.length} yellow, ${userAlerts.redAlerts.length} red`}</p>
    </>
  );
};

export default Homepage;