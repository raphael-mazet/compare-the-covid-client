import gql from 'graphql-tag';

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
  GET_SAVED_LOCATION_BY_USER_ID
}
