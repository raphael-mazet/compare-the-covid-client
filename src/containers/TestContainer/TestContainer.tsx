import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const testQuery = gql `
  query getRaph {
    getUserbyId(id:1) {
      username
    }
  }
`

interface Data {
  getUserbyId: {
    id: number;
    username: string;
    password: string;
    email: string
  }
}

interface Variables {
  first: number;
}

interface newUser {
  id: number;
  username: string;
  password: string;
  email: string
}

export default function TestContainer(): JSX.Element {
  const {data, loading, error} = useQuery<Data>(testQuery)
  const [newUser, setNewUser] = useState<newUser | undefined>(undefined);

  function handleChange(e: any) {
    e.persist();
    setNewUser((newUser: any) => (
      {...newUser, [e.target.id]: e.target.value}
    ))
  }

  function handleSubmit(e: any) {
    e.precentDefault();
  }
  
  return (
  <>
    <div>
      {loading ? <p>loading</p> : <p>Hello {data?.getUserbyId.username}</p> }
    </div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="id">id</label>
      <input id="id" type="text" name="id" value={newUser?.id} onChange={handleChange}/>
      <label htmlFor="username">username</label>
      <input id="username" type="text" name="username" value={newUser?.username} onChange={handleChange}/>
      <label htmlFor="password">password</label>
      <input id="password" type="text" name="password" value={newUser?.password} onChange={handleChange}/>
      <label htmlFor="email">email</label>
      <input id="email" type="text" name="email" value={newUser?.email} onChange={handleChange}/>
      <button type="submit">Submit</button>
    </form>
  </>
  )
}