import gql from "graphql-tag";

//ASK: username not email?
const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $email: String
  ) {
    createUser(
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      message
      token
      status
      userData {
        id
        username
        firstName
        lastName
        email
        last_loggedin
        last_checkedEvents
      }
    }
  }
`;

export { CREATE_USER };
