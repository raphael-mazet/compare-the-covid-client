import gql from "graphql-tag";

const GET_EVENTS_BY_ALERT_TYPE = gql`
  query GetEventsbyAlertType($alertType: String!) {
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
`;

const GET_EVENTS_BY_LOCATION_ID = gql`
  query GetEventsbyLocation_Id($location_id: Int!) {
    getEventsbyLocation_Id(location_id: $location_id) {
      id
      alertType
      alertDate
      alertScore
      created_at
      expires_on
    }
  }
`;

<<<<<<< HEAD
const GET_EVENTS_BY_MULTIPLE_LOCATION_IDS = gql `
  query getLocationsByMultipleLocationIds($location_ids: [Int]) {
  getEventsbyMultipleLocationIds(location_ids: $location_ids){
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

export {
  GET_EVENTS_BY_ALERT_TYPE,
  GET_EVENTS_BY_LOCATION_ID,
  GET_EVENTS_BY_MULTIPLE_LOCATION_IDS
}
=======
export { GET_EVENTS_BY_ALERT_TYPE, GET_EVENTS_BY_LOCATION_ID };
>>>>>>> b6c0f386b83e6445832797ea7e82e457a49a1392
