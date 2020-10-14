import gql from "graphql-tag";

const CREATE_EVENT = gql`
  mutation CreateEvent(
    $alertType: String!
    $alertDate: String!
    $alertScore: Int!
    $location_id: Int
    $created_at: String!
    $expires_on: String!
  ) {
    createEvent(
      alertType: $alertType
      alertDate: $alertDate
      alertScore: $alertScore
      location_id: $location_id
      created_at: $created_at
      expires_on: $expires_on
    ) {
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

export { CREATE_EVENT };
