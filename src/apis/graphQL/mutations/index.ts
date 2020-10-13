import { CREATE_USER } from './userMutations';
import { CREATE_EVENT } from './eventMutations';
import { CREATE_LOCATION } from './locationMutations';
import {
  CREATE_SAVED_LOCATION,
  DELETE_SAVED_LOCATION,
  UPDATE_SAVED_LOCATION_SELECTION_DATE
} from './savedLocationMutations';

//ASK: see if possible to create a newUserInput type instead of individual parameters
//ASK: wrap this in function to specify which properties to get back?

export {
  CREATE_USER,
  CREATE_EVENT,
  CREATE_LOCATION,
  CREATE_SAVED_LOCATION,
  DELETE_SAVED_LOCATION,
  UPDATE_SAVED_LOCATION_SELECTION_DATE
}
