import gql from 'graphql-tag';

//ASK: wrap queries in functions to specify returned fields?
//NOTE: may be simpler to set variables with an INPUT object instead of indiv variables

//NOTE: important to try to always return id
//NOTE: and return same fields with mutations
//NOTE: if not Apollo cache won't auto update

//User queries
const GET_USER_BY_ID = gql `
  query GetUserbyId ($id: Int!) {
    getUserbyId(id: $id) {
      id
      username
      password
      firstName
      lastName
    }
  }
`
const GET_USER_BY_USERNAME_AND_PASSWORD = gql `
  query GetUserbyUsernameAndPassword ($username: String!, $password: String! ) {
    getUserbyUsernameAndPassword(username: $username, password: $password) {
      id
      username
      password
      firstName
      lastName
    }
  }
`

//Event queries
const GET_EVENTS_BY_ALERT_TYPE = gql `
  query GetEventsbyAlertType($alertType: String!){
    getEventsbyAlertType(alertType: $alertType) {
      id
      alertType
      alertDate
      alertScore
      location_id {
        id
        name
        country
        googlemap_URL
        location_type
        longitude
        latitude
      }
      created_at
      expires_on
    }
  }
`

const GET_EVENTS_BY_LOCATION_ID = gql `
  query GetEventsbyLocation_Id ($location_id: Int!) {
    getEventsbyLocation_Id(location_id: $location_id) {
      id
      alertType
      alertDate
      alertScore
      created_at
      expires_on
    }
  }
`

//Event queries
const GET_LOCATION_BY_URL = gql `
  query GetLocationbyURL ($googlemap_URL: String!) {
    getLocationbyURL(googlemap_URL: $googlemap_URL) {
      id
      name
      country
      googlemap_URL
      location_type
      longitude
      latitude
    }
  }
`

const GET_LOCATION_BY_ID = gql `
  query GetLocationbyId ($id: Int!) {
    getLocationbyId (id: $id) {
      id
      name
      country
      googlemap_URL
      location_type
      longitude
      latitude
    }
  }
`

const GET_SAVED_LOCATION_BY_USER_ID = gql `
  query GetSavedLocationbyUser_Id ($user_id: Int!){
    getSavedLocationbyUser_Id (user_id: $user_id) {
      user_id {
        id
        username
        password
      }
      location_id {
        id
        name
        country
        googlemap_URL
        location_type
        longitude
        latitude
      }
      selection_date
    }
  }
`

export {
  GET_USER_BY_ID,
  GET_USER_BY_USERNAME_AND_PASSWORD,
  GET_EVENTS_BY_ALERT_TYPE,
  GET_EVENTS_BY_LOCATION_ID,
  GET_LOCATION_BY_URL,
  GET_LOCATION_BY_ID,
  GET_SAVED_LOCATION_BY_USER_ID
}
