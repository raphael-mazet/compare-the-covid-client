import * as interfaces from './localstateinterfaces'

export const userSearchDataInitialValue: interfaces.UserSearchData = 
  {
    id: 0,
    latitude: 48.8477397,
    longitude: 2.2579683,
  }

export const UserAlertsInitialValue: interfaces.UserAlerts = 
  {
    confirmed: [],
    suspected: [],
    safe: [],
  }

  export const authenticatedUserInitialValue: interfaces.AuthenticatedUser =
  {
    id: 3,
    token: 'hello'
  }
