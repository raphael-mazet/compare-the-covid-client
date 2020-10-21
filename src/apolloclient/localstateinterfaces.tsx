import { Location } from '../interfaces/query.interface';
import { Event } from '../interfaces/query.interface'

export interface UserSearchData {
  id?: number | null,
  name?: string,
  country?: string,
  googlemap_URL?: string,
  location_type?: string,
  latitude?: number | null,
  longitude?: number | null,
}

export interface UserAlerts {
  confirmed: any[],
  suspected: any[],
  safe: any[],
}

export interface AuthenticatedUser {
  id?: number | null | undefined,
  token?: string | null,
  last_checkedEvents: string | undefined,
}

export type SavedLocations = Location[];

export interface SelectedLocationEvents {
  location: Location | null
}