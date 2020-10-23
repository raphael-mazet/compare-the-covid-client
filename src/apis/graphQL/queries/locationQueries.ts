import gql from "graphql-tag";

const GET_LOCATION_BY_URL = gql`
  query GetLocationbyURL($googlemap_URL: String!) {
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
`;

const GET_LOCATION_BY_ID = gql`
  query GetLocationbyId($id: Int!) {
    getLocationbyId(id: $id) {
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

export { GET_LOCATION_BY_URL, GET_LOCATION_BY_ID };
