
import { GET_USER_BY_ID, GET_USER_BY_USERNAME_AND_PASSWORD } from './userQueries';
import { GET_EVENTS_BY_ALERT_TYPE, GET_EVENTS_BY_LOCATION_ID,GET_EVENTS_BY_MULTIPLE_LOCATION_IDS } from './eventQueries';
import { GET_LOCATION_BY_URL, GET_LOCATION_BY_ID } from './locationQueries';
import { GET_SAVED_LOCATION_BY_USER_ID } from './savedLocationQueries';

//ASK: wrap queries in functions to specify returned fields?
//NOTE: important to try to always return id
//NOTE: and return same fields with mutations
//NOTE: if not Apollo cache won't auto update

export {
  GET_USER_BY_ID,
  GET_USER_BY_USERNAME_AND_PASSWORD,
  GET_EVENTS_BY_ALERT_TYPE,
  GET_EVENTS_BY_LOCATION_ID,
  GET_EVENTS_BY_MULTIPLE_LOCATION_IDS,
  GET_LOCATION_BY_URL,
  GET_LOCATION_BY_ID,
  GET_SAVED_LOCATION_BY_USER_ID
}