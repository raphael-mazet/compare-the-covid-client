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

const UPDATE_LAST_CHECKED_EVENTS = gql`
  mutation UpdateLastCheckedEvents(
    $id: Int!
    $last_checkedEvents: DateScalar!
  ) {
    updateLastCheckedEvents(
      id: $id
      last_checkedEvents: $last_checkedEvents
    ) {
      id
      last_checkedEvents
    }
  }
`

export { CREATE_USER, UPDATE_LAST_CHECKED_EVENTS };
