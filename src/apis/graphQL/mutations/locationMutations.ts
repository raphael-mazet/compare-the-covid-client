import gql from "graphql-tag";

const CREATE_LOCATION = gql `
  mutation CreateLocation (
    $name: String!, 
    $country: String!,
    $googlemap_URL: String!,
    $location_type: String!,
    $longitude: Float!,
    $latitude: Float!,
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
