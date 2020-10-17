import gql from "graphql-tag";

const GET_USER_BY_ID = gql`
  query GetUserbyId($id: Int!) {
    getUserbyId(id: $id) {
      id
      username
      password
      firstName
      lastName
      email
      last_loggedin
      last_checkedEvents
    }
  }
`;
const GET_USER_BY_USERNAME_AND_PASSWORD = gql`
  query GetUserbyUsernameAndPassword($username: String!, $password: String!) {
    getUserbyUsernameAndPassword(username: $username, password: $password) {
      message,
      token,
      status,
      userData {
        id,
        username,
        firstName,
        lastName,
        email,
        last_loggedin,
        last_checkedEvents
      }
    }
  }
`;

export { GET_USER_BY_ID, GET_USER_BY_USERNAME_AND_PASSWORD };
