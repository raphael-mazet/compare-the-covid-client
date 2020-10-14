import gql from "graphql-tag";

<<<<<<< HEAD

//TODO: add an update event mutation
const CREATE_EVENT = gql `
  mutation CreateEvent (
    $alertType: String!,
    $alertDate: DateScalar!, 
    $alertScore: Int!,
    $location_id: Int,
    $created_at: DateScalar!,
    $expires_on: DateScalar!
  ){
    createEvent (
      alertType: $alertType, 
      alertDate: $alertDate, 
      alertScore: $alertScore,
      location_id: $location_id,
      created_at: $created_at,
      expires_on: $expires_on,
=======
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
>>>>>>> b6c0f386b83e6445832797ea7e82e457a49a1392
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
