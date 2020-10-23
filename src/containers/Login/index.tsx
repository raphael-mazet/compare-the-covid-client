import React, {ChangeEvent, FormEvent, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { User } from '../../interfaces/query.interface';
import { GET_USER_BY_USERNAME_AND_PASSWORD } from '../../apis/graphQL/queries/index';
import Input from '../../components/Forms/Input';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import useWindowSize from '../../helpers/getWindowSize';
import './index.style.scss'
import logo from '../../images/logo.png'
import { authenticatedUserVar, savedLocationsVar, userAlertsVar, userSearchDataVar } from '../../apolloclient/makevar';
import { SavedLocations, UserAlerts } from '../../apolloclient/localstateinterfaces'
import { setAlerts } from '../../helpers/setAlerts';


type userData = { 
  status: number;
  message: string;
  token?: string;
  userData?: User;
  locationData?: SavedLocations;
  eventData?: UserAlerts
}

const Login: React.FunctionComponent = (props: any) => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error,] = useState<string | null>();
  const history = useHistory();
  const window = useWindowSize();


  const [getUser] = useLazyQuery<{getUserbyUsernameAndPassword: userData}>(GET_USER_BY_USERNAME_AND_PASSWORD, {
    onCompleted: checkAuth
  });

  function checkAuth (response: {getUserbyUsernameAndPassword: userData }) {
    const {status, message, token, userData, locationData, eventData } = response.getUserbyUsernameAndPassword;
    if (status === 200 && token) {
      const userInfo = {
        id: userData?.id,
        token: token,
        last_checkedEvents: userData?.last_checkedEvents,
      }
      authenticatedUserVar(userInfo);
      savedLocationsVar(locationData);
      userSearchDataVar({});
      const classifiedAlerts = setAlerts(eventData);
      userAlertsVar(classifiedAlerts);
      history.push('/home')
    }
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
    <div className='login_page-wrapper' >
      <div className='login_image-wrapper'>
        <img src={logo} alt="Logo"/>
      </div>
      <div className='login_form-wrapper'>
        <form className='login_form-container' onSubmit={(e)=> handleSubmit(e)}>
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
            type='password'
          />
        </form>
        {error && 
          <span style={{ color: 'red'}}> {error}</span>
        }
        <div className='login_button-container'>
          <Button
            onClick={(e: any) => handleSubmit(e)}
            content="Submit"
          />
        </div>
      </div>
    </div>
  )
}

export default Login;