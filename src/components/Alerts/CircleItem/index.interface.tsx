import { SavedLocations } from "../../../apolloclient/localstateinterfaces";

export interface FilteredAlerts {
  alertType: string,
  alertNumber: number
  isNew: boolean
}

export interface circleItemProps {
  alerts: FilteredAlerts;
  savedLocations: SavedLocations;
}
