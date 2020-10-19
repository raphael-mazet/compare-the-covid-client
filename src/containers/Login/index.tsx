import React, {ChangeEvent, FormEvent, useState} from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { User, SavedLocationsArray, Event } from '../../interfaces/query.interface';
import {
  GET_SAVED_LOCATION_BY_USER_ID,
  GET_EVENTS_BY_MULTIPLE_LOCATION_IDS,
  GET_USER_BY_USERNAME_AND_PASSWORD,
} from '../../apis/graphQL/queries/index';
import Input from '../../components/Forms/Input';
import Button from '../../components/Button';
import { setAlerts } from '../../helpers/setAlerts'
import { useHistory } from 'react-router-dom';
import useWindowSize from '../../helpers/getWindowSize';
import './index.style.scss'
import { authenticatedUserVar } from "../../apolloclient/makevar";
import saveLocationsToCache from '../../helpers/saveLocationsToCache'

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

  const window = useWindowSize();

  function searchLocations() {
    getSavedLocations({
      variables: {
        user_id: userData?.getUserbyUsernameAndPassword?.userData?.id
      }
    })
  }

  const checkAuth = (response: {getUserbyUsernameAndPassword: userData }) => {
    const {status, message, token, userData } = response.getUserbyUsernameAndPassword;
      
    if (status === 200 && token) {
      const userInfo = {
        id: userData?.id,
        token: token,
        last_checkedEvents: userData?.last_checkedEvents,
      }
      authenticatedUserVar(userInfo);
      searchLocations();
      setError(null);
    } else if (status === 404) {
      setError(message);
    }
  } 

  const startSetAlerts = (data: { getEventsbyMultipleLocationIds: [Event] }) => {
    setAlerts(data, ()=> history.push('home'));
  }
  
  const [getUser, {data: userData}] = useLazyQuery<{getUserbyUsernameAndPassword: userData}>(GET_USER_BY_USERNAME_AND_PASSWORD, {
    onCompleted: checkAuth
  });

  const [getSavedLocations] = useLazyQuery<{getSavedLocationbyUser_Id: SavedLocationsArray}>(GET_SAVED_LOCATION_BY_USER_ID, {
    onCompleted: getLocationEvents
  });

  const [getEvents] = useLazyQuery<{getEventsbyMultipleLocationIds: [Event]}>(GET_EVENTS_BY_MULTIPLE_LOCATION_IDS, {
    onCompleted: startSetAlerts
  })

  function getLocationEvents (locationData: {getSavedLocationbyUser_Id: SavedLocationsArray}) {
    saveLocationsToCache(locationData)
    const locationIds: (number | null)[] = [];
    locationData.getSavedLocationbyUser_Id.forEach((location: any) => {
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
    <div className='page-wrapper' >
      <div className='form-wrapper'>
        <form className='form-container' onSubmit={(e)=> handleSubmit(e)}>
          <Input
            label="email"
            required={true}
            value={username}
            onChange={handleChange}
            inLineLabel={window.width > 375 ? true : false}
            id='email'
            autoComplete=''
            error=''
          />
          <Input
            label="password"
            required={true}
            value={password}
            onChange={handleChange}
            inLineLabel={window.width > 375 ? true : false}
            id='password'
            autoComplete=''
            error=''
          />
        </form>
        {error && 
          <span style={{ color: 'red'}}> {error}</span>
        }
        <div className='button-container'>
          <Button
            onClick={(e: any) => handleSubmit(e)}
            content="Submit"
          />
        </div>
      </div>
    </div>
  )
}

export default TestLogin;
