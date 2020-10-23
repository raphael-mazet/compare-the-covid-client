import { makeVar } from "@apollo/client";
import * as initialvalues from './initialvalues'
import * as interfaces from './localstateinterfaces'

export const userSearchDataVar = makeVar<interfaces.UserSearchData>(
  initialvalues.userSearchDataInitialValue
)

export const userAlertsVar = makeVar<interfaces.UserAlerts>(
  initialvalues.UserAlertsInitialValue
);

export const authenticatedUserVar = makeVar<interfaces.AuthenticatedUser>(
  initialvalues.authenticatedUserInitialValue
)
export const savedLocationsVar = makeVar<interfaces.SavedLocations>(
  initialvalues.savedLocationsInitialValue
)

export const selectedLocationsEventsVar = makeVar<interfaces.SelectedLocationEvents>(
  initialvalues.selectedLocationsEventsInitialValue
)