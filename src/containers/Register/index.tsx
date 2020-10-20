import React, { useState } from "react";
import Input from '../../components/Forms/Input';
import { gql, useMutation } from '@apollo/react-hooks';
import Button from '../../components/Button';
import { CREATE_USER } from '../../apis/graphQL/mutations';
import { User } from '../../interfaces/query.interface';
import { useHistory } from 'react-router-dom';
import { authenticatedUserVar } from "../../apolloclient/makevar";
import useWindowSize from '../../helpers/getWindowSize';
import useModal from '../../helpers/useModal'
import Modal from "../../components/Modal";

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
  const history = useHistory(); 

  const checkAuth = (responseData: any) => {
    //logic for authentication
    const newUser = authenticatedUserVar();
    const newUserData = {
      id: responseData.createUser.userData.id,
      token: responseData.createUser.token,
      last_checkedEvents: ''
    }
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
    if ((formData?.username && formData?.password) !== undefined ) {
      if (formData?.password === formData?.confirmPassword) {
        setUser({ variables: registrationData });
        history.push('/login');
      } else {
        const text = 'Please submit matching passwords';
        toggleModal(text);  
      }
    } else {
      const text = 'Please submit both a username and password';
      toggleModal(text);
    }
  }

  const {isShowing, toggleModal, modalText} = useModal();

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
      <Modal
        isShowing={isShowing}
        hide={toggleModal}
        text={modalText}
      />
    </div>
  );
};

export default Register;
