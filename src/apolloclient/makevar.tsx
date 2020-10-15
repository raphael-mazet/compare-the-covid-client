import { makeVar } from "@apollo/client";
import { 
  userSearchDataInitialValue,
  UserAlertsInitialValue
} from './initialvalues'
import { 
  UserSearchData,
  UserAlerts
} from './interfaces'

export const userSearchDataVar = makeVar<UserSearchData>(
  userSearchDataInitialValue
)

export const userAlertsVar = makeVar<UserAlerts>(
  UserAlertsInitialValue
);