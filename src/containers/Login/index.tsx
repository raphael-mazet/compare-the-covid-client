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
import { useHistory } from 'react-router-dom';

type userData = { 
  status: number;
  message: string;
  token?: string;
  userData?: User;
}

const TestLogin: React.FunctionComponent = (props: any) => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>();

  const history = useHistory();
  // const locationRouter = () => history.push("/locations");
  // const caseRouter = () => history.push("/log-case");


  function searchLocations() {
    getSavedLocations({
      variables: {
        user_id: userData?.getUserbyUsernameAndPassword?.userData?.id
      }
    })
  }

  const checkAuth = (response: {getUserbyUsernameAndPassword: userData }) => {
    console.log('checkauth',response);
    const {status, message, token } = response.getUserbyUsernameAndPassword;
    
    if (status === 200 && token) {
      searchLocations();
      setError(null);
    } else if (status === 404) {
      setError(message);
    }
  } 

  const startSetAlerts = (data: { getEventsbyMulitpleLocationIds: [Event] }) => {
    setAlerts(data, ()=> history.push('home'));
  }
  
  const [getUser, {data: userData}] = useLazyQuery<{getUserbyUsernameAndPassword: userData}>(GET_USER_BY_USERNAME_AND_PASSWORD, {
    onCompleted: checkAuth
  });

  const [getSavedLocations] = useLazyQuery<{getSavedLocationbyUser_Id: SavedLocationsArray}>(GET_SAVED_LOCATION_BY_USER_ID, {
    onCompleted: getLocationEvents
  });

  const [getEvents] = useLazyQuery<{getEventsbyMulitpleLocationIds: [Event]}>(GET_EVENTS_BY_MULTIPLE_LOCATION_IDS, {
    onCompleted: startSetAlerts
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

      <form>
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
      </form>
      {error && 
        <span style={{ color: 'red'}} > {error}</span>
      }
      <Button
        onClick={(e: any) => handleSubmit(e)}
        content="Submit"
      />
    </>
  )
}

export default TestLogin;
