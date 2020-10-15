import { InMemoryCache } from "@apollo/client";
import * as makeVar from './makevar'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchdata: {
          read () {
            return makeVar.userSearchDataVar();
          }
        },
        useralerts: {
          read () {
            return makeVar.userAlertsVar();
          }
        },
      }
    }
  }
});