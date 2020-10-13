import gql from 'graphql-tag';

//NOTE: important to try to always return id
//NOTE: and return same fields with mutations
//NOTE: if not Apollo cache won't auto update
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