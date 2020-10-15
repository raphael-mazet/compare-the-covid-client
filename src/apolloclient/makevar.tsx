import { makeVar } from "@apollo/client";
import * as initialvalues from './initialvalues'
import * as interfaces from './interfaces'

export const userSearchDataVar = makeVar<interfaces.UserSearchData>(
  initialvalues.userSearchDataInitialValue
)

export const userAlertsVar = makeVar<interfaces.UserAlerts>(
  initialvalues.UserAlertsInitialValue
);