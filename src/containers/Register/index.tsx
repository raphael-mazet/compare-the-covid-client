import React, { useState } from "react";
import Input from '../../components/Forms/Input';
import { useLazyQuery } from '@apollo/react-hooks';
import Button from '../../components/Button';
import { CREATE_USER } from '../../apis/graphQL/mutations';
import { User } from '../../interfaces/query.interface';

const Register: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<User>();

  const checkAuth = (responseData: any) => {
    //logic for authentication
  }

  const [setUser, { data: responseData }] = useLazyQuery<{ createUser: User }>(CREATE_USER, {
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
    setUser({
      variables: formData
    });

  }

  return (
    <>
      <form>
        <Input
          label="email"
          required={true}
          value={''}
          onChange={(e)=>handleChange(e.target.value, 'email')}
          inLineLabel={true}
          id='email'
          autoComplete=''
          error=''
        />
        <Input
          label="first name"
          required={true}
          value={''}
          onChange={(e) => handleChange(e.target.value, 'firstName')}
          inLineLabel={true}
          id='email'
          autoComplete=''
          error=''
        />
        <Input
          label="last name"
          required={true}
          value={''}
          onChange={(e) => handleChange(e.target.value, 'lastName')}
          inLineLabel={true}
          id='email'
          autoComplete=''
          error=''
        />

        <Input
          label="password"
          required={true}
          value={''}
          onChange={(e) => handleChange(e.target.value, 'password')}
          inLineLabel={true}
          id='password'
          autoComplete=''
          error=''
        />

        <Input
          label="confirm password"
          required={true}
          value={''}
          onChange={(e) => handleChange(e.target.value, 'confirmPassword')}
          inLineLabel={true}
          id='password'
          autoComplete=''
          error=''
        />

        <Button
          onClick={() => {}}
          content="Submit"
        />
      </form>
    </>
  );
};

export default Register;
