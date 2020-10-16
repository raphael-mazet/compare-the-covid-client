export interface UserSearchData {
  id?: number,
  latitude: number,
  longitude: number,
}

export interface UserAlerts {
  confirmed: any[],
  suspected: any[],
  safe: any[],
}

export interface AuthenticatedUser {
  id?: number,
  token?: string,
}