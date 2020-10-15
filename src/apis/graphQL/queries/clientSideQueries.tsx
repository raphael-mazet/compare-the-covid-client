import { gql } from '@apollo/client'

const GET_LOGGED_USER = gql `
  query LoggedUserId {
    loggedUserId @client
  }
`

export {
  GET_LOGGED_USER
}