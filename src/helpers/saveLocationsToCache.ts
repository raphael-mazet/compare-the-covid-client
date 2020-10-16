import { savedLocationsVar } from "../apolloclient/makevar";
import { SavedLocationsArray } from "../interfaces/query.interface";


export default function saveLocationsToCache (locationAndUserData: {getSavedLocationbyUser_Id: SavedLocationsArray}) {
  const savedLocations = locationAndUserData.getSavedLocationbyUser_Id.map(data=>data.location_id)
  savedLocationsVar(savedLocations)
}