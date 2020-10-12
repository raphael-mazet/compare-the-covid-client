import React, { useState, ChangeEvent, FormEvent } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const GET_USER_BY_ID = gql `
  query GetUserbyId ($id: Int!) {
    getUserbyId(id: $id) {
      id
      username
      email
      password
    }
  }
`

const CREATE_USER = gql `
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
	  createUser(
      username:$username,
      password: $password,
      email:$email
      ) {
      username
      id
  }
}
`

interface User {
  id: number | null;
  username: string;
  email: string;
  password: string
}

interface QueryData {
  getUserbyId: User
}

export default function TestContainer(): JSX.Element {
  const [newUser, setNewUser] = useState<User>({
    id: null,
    username: '',
    email: '',
    password: ''
  });

  const {data: userData, loading, error: userDataError} = useQuery<QueryData>(GET_USER_BY_ID, {
    variables: {
      id:4
    }
  })
  const [saveUser, { data: savedUserData, error: saveUserError }] = useMutation<{createUser: User}>(
    CREATE_USER, {
    variables: {
      username: newUser?.username,
      password: newUser?.password,
      email: newUser?.email
    }
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    e.persist();
    setNewUser(prevState => (
      {...prevState, [e.target.id]: e.target.value}
    ))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    saveUser()
    setNewUser({
      id: null,
      username: '',
      email: '',
      password: ''
    })
  }

  return (
  <>
    <div>
      {loading ? <p>loading</p> : <p>Hello {userData?.getUserbyId.username}</p> }
    </div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">username</label>
      <input id="username" type="text" name="username" value={newUser?.username} onChange={handleChange}/>
      <label htmlFor="password">password</label>
      <input id="password" type="text" name="password" value={newUser?.password} onChange={handleChange}/>
      <label htmlFor="email">email</label>
      <input id="email" type="text" name="email" value={newUser?.email} onChange={handleChange}/>
      <button type="submit">Submit</button>
    </form>
    <div>
  {savedUserData && <p>You have created {savedUserData?.createUser.username}, id:{savedUserData?.createUser.id}</p> }
    </div>

  </>
  )
}