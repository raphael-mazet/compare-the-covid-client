import { gql } from '@apollo/client'

const GET_LOGGED_USER_ID = gql `
  query LoggedUserId {
    loggedUserId @client
  }
`

const USER_ALERTS = gql `
query SetAlerts {
  greenAlerts @client
  yellowAlerts @client
  redAlerts @client
}
`;

export {
  GET_LOGGED_USER_ID,
  USER_ALERTS
}