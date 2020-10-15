import { UserSearchData, UserAlerts } from './interfaces'

export const userSearchDataInitialValue: UserSearchData = 
  {
    id: 0,
    latitude: 48.8477397,
    longitude: 2.2579683,
  }

export const UserAlertsInitialValue: UserAlerts = 
{
  confirmed: 3,
  suspected: 0,
  safe: 0,
}