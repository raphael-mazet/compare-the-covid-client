import gql from "graphql-tag";

<<<<<<< HEAD
const CREATE_LOCATION = gql `
  mutation CreateLocation (
    $name: String!, 
    $country: String!,
    $googlemap_URL: String!,
    $location_type: String!,
    $longitude: Float!,
    $latitude: Float!,
=======
const CREATE_LOCATION = gql`
  mutation CreateLocation(
    $name: String!
    $country: String!
    $googlemap_URL: String!
    $location_type: String!
    $longitude: Int!
    $latitude: Int!
>>>>>>> b6c0f386b83e6445832797ea7e82e457a49a1392
  ) {
    createLocation(
      name: $name
      country: $country
      googlemap_URL: $googlemap_URL
      location_type: $location_type
      longitude: $longitude
      latitude: $latitude
    ) {
      id
      name
      country
      googlemap_URL
      location_type
      longitude
      latitude
    }
  }
`;

export { CREATE_LOCATION };
