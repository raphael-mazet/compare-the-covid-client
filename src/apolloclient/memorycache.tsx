import { InMemoryCache } from "@apollo/client";
import * as makeVar from './makevar'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchData: {
          read () {
            return makeVar.userSearchDataVar();
          }
        },
        userAlerts: {
          read () {
            return makeVar.userAlertsVar();
          }
        },
        authenticatedUser: {
          read() {
            return makeVar.authenticatedUserVar()
          }
        },
        savedLocations: {
          read() {
            return makeVar.savedLocationsVar()
          }
        },
        selectedLocationsEvents: {
          read() {
            return makeVar.selectedLocationsEventsVar()
          }
        },
      }
    }
  }
});