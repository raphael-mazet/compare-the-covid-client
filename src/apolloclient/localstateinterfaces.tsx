export interface UserSearchData {
  id?: number,
  latitude: number,
  longitude: number,
}

export interface UserAlerts {
  confirmed: number,
  suspected: number,
  safe: number,
}