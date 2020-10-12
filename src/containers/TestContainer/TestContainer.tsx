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

export default function TestContainer(): JSX.Element {
  const {data, loading, error} = useQuery<Data>(testQuery)
  
  return (
  <>
    <div>
      {loading ? <p>loading</p> : <p>Hello {data?.getUserbyId.username}</p> }
    </div>
  </>
  )
}