import * as interfaces from './localstateinterfaces'

export const userSearchDataInitialValue: interfaces.UserSearchData = 
  {
    id: 0,
    name: 'test',
    country: 'France',
    googlemap_URL: 'unique@id',
    location_type: 'test',
    latitude: 0,
    longitude: 0,
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
    token: ''
  }

  export const savedLocationsInitialValue: interfaces.SavedLocations = []

  export const selectedLocationsEventsInitialValue: interfaces.SelectedLocationEvents = {
    location: null
  }