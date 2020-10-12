import gql from 'graphql-tag';

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
export {
  GET_USER_BY_ID,
}