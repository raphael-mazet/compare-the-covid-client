import * as interfaces from './localstateinterfaces'

export const userSearchDataInitialValue: interfaces.UserSearchData = 
  {
    id: null,
    name: '',
    country: '',
    location_type: '',
    googlemap_URL: '',
    latitude: null,
    longitude: null,
  }

export const UserAlertsInitialValue: interfaces.UserAlerts = 
  {
    confirmed: [],
    suspected: [],
    safe: [],
  }

  export const authenticatedUserInitialValue: interfaces.AuthenticatedUser =
  {
    id: null,
    token: '',
    last_checkedEvents: '',
  }

  export const savedLocationsInitialValue: interfaces.SavedLocations = []

  export const selectedLocationsEventsInitialValue: interfaces.SelectedLocationEvents = {
    location: null
  }