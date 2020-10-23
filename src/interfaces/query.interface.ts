interface User {
  id: number | null;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  last_loggedin: string;
  last_checkedEvents: string;
}
interface UserAuth {
  id: number | null | undefined;
  token: string;
  last_checkedEvents: string | undefined;
}

interface Event {
  id?: number | null | undefined;
  alertType: string | null | undefined;
  alertDate: string | null | undefined;
  alertScore: number | null | undefined;
  location_id: number | null | undefined;
  created_at: string;
  expires_on: string;
}

interface Location {
  id: number | null;
  name: string;
  country: string;
  googlemap_URL: string;
  location_type: string;
  longitude: number;
  latitude: number;
  events?: Event[]
}

interface SavedLocations {
  user_id: User;
  location_id: Location
}

type GetUserbyId = User

type SavedLocationsArray = SavedLocations[]


export type {
  User,
  SavedLocations,
  GetUserbyId,
  SavedLocationsArray,
  Location,
  Event,
  UserAuth
}
