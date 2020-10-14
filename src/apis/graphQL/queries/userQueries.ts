import gql from "graphql-tag";

const GET_USER_BY_ID = gql`
  query GetUserbyId($id: Int!) {
    getUserbyId(id: $id) {
      id
      username
      password
      firstName
      lastName
    }
  }
`;
const GET_USER_BY_USERNAME_AND_PASSWORD = gql`
  query GetUserbyUsernameAndPassword($username: String!, $password: String!) {
    getUserbyUsernameAndPassword(username: $username, password: $password) {
      id
      username
      password
      firstName
      lastName
    }
  }
`;

export { GET_USER_BY_ID, GET_USER_BY_USERNAME_AND_PASSWORD };
