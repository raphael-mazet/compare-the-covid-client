import gql from "graphql-tag";

const CREATE_SAVED_LOCATION = gql `
  mutation CreateSavedLocation (
    $user_id: Int!,
    $location_id: Int!,
    $selection_date: DateScalar!,
  ) {
    createSavedLocation(
      user_id: $user_id
      location_id: $location_id
      selection_date: $selection_date
    ) {
      user_id {
        id
        username
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
`;

const DELETE_SAVED_LOCATION = gql`
  mutation DeleteSavedLocation($user_id: Int!, $location_id: Int!) {
    deleteSavedLocation(user_id: $user_id, location_id: $location_id) {
      count
    }
  }
`;

const UPDATE_SAVED_LOCATION_SELECTION_DATE = gql `
  mutation UpdateSavedLocationSelectionDate (
    $user_id: Int!,
    $location_id: Int!,
    $selection_date: DateScalar!,
  ) {
    updateSavedLocationSelectionDate(
      user_id: $user_id
      location_id: $location_id
      selection_date: $selection_date
    ) {
      count
    }
  }
`;

export {
  CREATE_SAVED_LOCATION,
  DELETE_SAVED_LOCATION,
  UPDATE_SAVED_LOCATION_SELECTION_DATE,
};
