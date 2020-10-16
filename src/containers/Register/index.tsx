import React, { useState } from "react";
import Input from '../../components/Forms/Input';
import { useLazyQuery } from '@apollo/react-hooks';
import Button from '../../components/Button';
import { CREATE_USER } from '../../apis/graphQL/mutations';
import { User } from '../../interfaces/query.interface';

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
