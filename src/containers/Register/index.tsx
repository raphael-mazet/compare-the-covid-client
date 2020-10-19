import React, { useState } from "react";
import Input from '../../components/Forms/Input';
import { gql, useMutation } from '@apollo/react-hooks';
import Button from '../../components/Button';
import { CREATE_USER } from '../../apis/graphQL/mutations';
import { User } from '../../interfaces/query.interface';
import client from '../../client';
import { authenticatedUserVar } from "../../apolloclient/makevar";
import useWindowSize from '../../helpers/getWindowSize';
import './index.style.scss';

type userForm = {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const Register: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<userForm>();


  const window = useWindowSize();


  const checkAuth = (responseData: any) => {
    //logic for authentication
    console.log(responseData.createUser)
    const newUser = authenticatedUserVar();
    console.log('newUser ->', newUser)
    const newUserData = {
      id: responseData.createUser.userData.id,
      token: responseData.createUser.token
    }
    console.log('newUserData -> ', newUserData)
    authenticatedUserVar(newUserData)
  }

  const [setUser, { data: responseData }] = useMutation<{ createUser: User }>(CREATE_USER, {
    onCompleted: checkAuth
  });

  const handleChange = (value: string, field: string) => {
    setFormData((formData:any) => (
      {
        ...formData,
        [field]: value
      }
    ));
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const registrationData = {
      username: formData?.username,
      password: formData?.password,
      firstName: formData?.firstName,
      lastName: formData?.lastName,
    }
    setUser({
      variables: registrationData,
    });
  }

  return (
    <div className='page-wrapper'>
      <div className='form-wrapper'>
        <form className='form-container' onSubmit={(e)=>handleSubmit(e)}>
        <Input
          label="username"
          required={true}
          value={formData?.username}
          onChange={(e)=>handleChange(e.target.value, 'username')}
          inLineLabel={window.width > 375 ? true : false}
          id='username'
          autoComplete=''
          error=''
        />
        <Input
          label="first name"
          required={true}
          value={formData?.firstName}
          onChange={(e) => handleChange(e.target.value, 'firstName')}
          inLineLabel={window.width > 375 ? true : false}
          id='email'
          autoComplete=''
          error=''
        />
        <Input
          label="last name"
          required={true}
          value={formData?.lastName}
          onChange={(e) => handleChange(e.target.value, 'lastName')}
          inLineLabel={window.width > 375 ? true : false}
          id='email'
          autoComplete=''
          error=''
        />
        <Input
          label="password"
          required={true}
          value={formData?.password}
          onChange={(e) => handleChange(e.target.value, 'password')}
          inLineLabel={ window.width > 375 ? true : false }
          id='password'
          autoComplete=''
          error=''
        />

        <Input
          label="confirm password"
          required={true}
          value={formData?.confirmPassword}
          onChange={(e) => handleChange(e.target.value, 'confirmPassword')}
          inLineLabel={ window.width > 375 ? true : false }
          id='password'
          autoComplete=''
          error=''
        />

        </form>
      </div>
      <div className='button-container'>
        <Button
          onClick={(e) => handleSubmit(e)}
          content="Submit"
        />
      </div>
    </div>
  );
};

export default Register;
