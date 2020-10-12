import React, { useState, ChangeEvent, FormEvent } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const testQuery = gql `
  query getRaph {
    getUserbyId(id:4) {
      username
    }
  }
`

interface queryData {
  getUserbyId: {
    id: number;
    username: string;
    password: string;
    email: string
  }
}

interface newUser {
  id: number;
  username: string;
  password: string;
  email: string
}

const CREATE_USER = gql `
mutation CreateUser($username: String!, $email: String!, $password: String!) {
	createUser(username:$username, password: $password, email:$email ) {
    username
  }
}
`

export default function TestContainer(): JSX.Element {
  const [newUser, setNewUser] = useState<newUser | undefined>(undefined);
  const {data: userData, loading, error: userDataError} = useQuery<queryData>(testQuery)
  const [saveUser, { data: savedUserData, error: saveUserError }] = useMutation<
    {createUser: newUser},
    {
      username: string | undefined,
      password: string | undefined,
      email: string | undefined
    }
  >(CREATE_USER, {
    variables: {
      username: newUser?.username,
      password: newUser?.password,
      email: newUser?.email
    }

  })

  //install ts lint? extension 
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    e.persist();
    setNewUser((newUser: any) => (
      {...newUser, [e.target.id]: e.target.value}
    ))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    saveUser()
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
      {savedUserData && <p>You have created {userData?.getUserbyId.username}</p> }
    </div>

  </>
  )
}