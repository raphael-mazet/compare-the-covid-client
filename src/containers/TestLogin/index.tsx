import React, {ChangeEvent, FormEvent, useState} from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { User, SavedLocations, SavedLocationsArray, Event } from '../../interfaces/query.interface';
import {
  GET_SAVED_LOCATION_BY_USER_ID,
  GET_EVENTS_BY_MULTIPLE_LOCATION_IDS,
  GET_USER_BY_USERNAME_AND_PASSWORD
} from '../../apis/graphQL/queries/index';
import Input from '../../components/Forms/Input';
import Button from '../../components/Button';
import { setAlerts } from '../../helpers/setAlerts'

const TestLogin: React.FunctionComponent = () => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [getUser, {data: userData}] = useLazyQuery<{getUserbyUsernameAndPassword: User}>(GET_USER_BY_USERNAME_AND_PASSWORD, {
    onCompleted: searchLocations
  });

  const [getSavedLocations] = useLazyQuery<{getSavedLocationbyUser_Id: SavedLocationsArray}>(GET_SAVED_LOCATION_BY_USER_ID, {
    onCompleted: getLocationEvents
  });

  const [getEvents] = useLazyQuery<{getEventsbyMulitpleLocationIds: [Event]}>(GET_EVENTS_BY_MULTIPLE_LOCATION_IDS, {
    onCompleted: setAlerts
  })

  function searchLocations() {
    getSavedLocations({
      variables: {
        user_id: userData?.getUserbyUsernameAndPassword?.id
      }
    })
  }

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
  
  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'email') setUsername(e.target.value)
    else setPassword(e.target.value)
  }
  
  function handleSubmit (e: FormEvent) {
    e.preventDefault();
    getUser({
      variables: { username, password }
    });
    setUsername('');
    setPassword('');
  }
  
  return (
    <>
      <h1>Log in</h1>

      <form onSubmit={handleSubmit}>
        <Input
        label="email"
        required={true}
        value={username}
        onChange={handleChange}
        inLineLabel={true}
        id='email'
        autoComplete=''
        error=''
      />

      <Input
          label="password"
          required={true}
          value={password}
          onChange={handleChange}
          inLineLabel={true}
          id='password'
          autoComplete=''
          error=''
        />

      <Button
        onClick={() => handleSubmit}
        content="Submit"
      />
      </form>
    </>
  )
}

export default TestLogin;