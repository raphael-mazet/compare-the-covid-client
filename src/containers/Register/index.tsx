import React, { useState } from "react";
import Input from '../../components/Forms/Input';
import { gql, useMutation } from '@apollo/react-hooks';
import Button from '../../components/Button';
import { CREATE_USER } from '../../apis/graphQL/mutations';
import { User } from '../../interfaces/query.interface';
import client from '../../client';
import { authenticatedUserVar } from "../../apolloclient/makevar";

type userForm = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const Register: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<userForm>();

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
      username: formData?.email,
      password: formData?.password,
      firstName: formData?.firstName,
      lastName: formData?.lastName,
    }
    setUser({
      variables: registrationData,
    });
  }

  return (
    <>
      <form>
        <Input
          label="email"
          required={true}
          value={formData?.email}
          onChange={(e)=>handleChange(e.target.value, 'email')}
          inLineLabel={true}
          id='email'
          autoComplete=''
          error=''
        />
        <Input
          label="first name"
          required={true}
          value={formData?.firstName}
          onChange={(e) => handleChange(e.target.value, 'firstName')}
          inLineLabel={true}
          id='email'
          autoComplete=''
          error=''
        />
        <Input
          label="last name"
          required={true}
          value={formData?.lastName}
          onChange={(e) => handleChange(e.target.value, 'lastName')}
          inLineLabel={true}
          id='email'
          autoComplete=''
          error=''
        />

        <Input
          label="password"
          required={true}
          value={formData?.password}
          onChange={(e) => handleChange(e.target.value, 'password')}
          inLineLabel={true}
          id='password'
          autoComplete=''
          error=''
        />

        <Input
          label="confirm password"
          required={true}
          value={formData?.confirmPassword}
          onChange={(e) => handleChange(e.target.value, 'confirmPassword')}
          inLineLabel={true}
          id='password'
          autoComplete=''
          error=''
        />

        <Button
          onClick={(e) => handleSubmit(e)}
          content="Submit"
        />
      </form>
    </>
  );
};

export default Register;
