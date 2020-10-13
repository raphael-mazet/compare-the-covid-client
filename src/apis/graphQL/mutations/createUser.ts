import gql from 'graphql-tag';

//ASK: see if possible to create a newUserInput type instead of individual parameters
//ASK: wrap this in function to specify which properties to get back?
const CREATE_USER = gql `
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
	  createUser(
      username:$username,
      password: $password,
      email:$email
      ) {
      id
      username
      email
  }
}
`

export {
  CREATE_USER,
}