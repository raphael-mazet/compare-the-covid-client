import { InMemoryCache } from "@apollo/client";
import { 
  userSearchDataVar,
  userAlertsVar
 } from './makevar'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchdata: {
          read () {
            return userSearchDataVar();
          }
        },
        useralerts: {
          read () {
            return userAlertsVar();
          }
        },
      }
    }
  }
});