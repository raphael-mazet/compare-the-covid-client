import gql from "graphql-tag";

<<<<<<< HEAD
const CREATE_SAVED_LOCATION = gql `
  mutation CreateSavedLocation (
    $user_id: Int!,
    $location_id: Int!,
    $selection_date: DateScalar!,
=======
const CREATE_SAVED_LOCATION = gql`
  mutation CreateSavedLocation(
    $user_id: Int!
    $location_id: Int!
    $selection_date: String!
>>>>>>> b6c0f386b83e6445832797ea7e82e457a49a1392
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
        googlemap_URL
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

<<<<<<< HEAD
const UPDATE_SAVED_LOCATION_SELECTION_DATE = gql `
  mutation UpdateSavedLocationSelectionDate (
    $user_id: Int!,
    $location_id: Int!,
    $selection_date: DateScalar!,
=======
const UPDATE_SAVED_LOCATION_SELECTION_DATE = gql`
  mutation UpdateSavedLocationSelectionDate(
    $user_id: Int!
    $location_id: Int!
    $selection_date: String!
>>>>>>> b6c0f386b83e6445832797ea7e82e457a49a1392
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
