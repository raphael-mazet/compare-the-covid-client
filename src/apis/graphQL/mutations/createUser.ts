import gql from 'graphql-tag';

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

export {
  CREATE_USER,
}