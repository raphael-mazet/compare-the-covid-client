import { GET_USER_BY_ID, GET_USER_BY_USERNAME_AND_PASSWORD } from './userQueries';
import { GET_EVENTS_BY_ALERT_TYPE, GET_EVENTS_BY_LOCATION_ID,GET_EVENTS_BY_MULTIPLE_LOCATION_IDS } from './eventQueries';
import { GET_LOCATION_BY_URL, GET_LOCATION_BY_ID } from './locationQueries';
import { GET_SAVED_LOCATION_BY_USER_ID } from './savedLocationQueries';
import { GET_LOGGED_USER_ID, USER_ALERTS } from './clientSideQueries';

export {
  GET_USER_BY_ID,
  GET_USER_BY_USERNAME_AND_PASSWORD,
  GET_EVENTS_BY_ALERT_TYPE,
  GET_EVENTS_BY_LOCATION_ID,
  GET_EVENTS_BY_MULTIPLE_LOCATION_IDS,
  GET_LOCATION_BY_URL,
  GET_LOCATION_BY_ID,
  GET_SAVED_LOCATION_BY_USER_ID,
  GET_LOGGED_USER_ID,
  USER_ALERTS
};
