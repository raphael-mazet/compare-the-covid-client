import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  makeVar,
} from "@apollo/client";
import { resolvers, typeDefs } from './apis/graphQL/resolvers';
import { gql } from '@apollo/client';

interface UserSearchData {
  id?: number,
  latitude: number,
  longitude: number,
}

const userSearchDataInitialValue: UserSearchData = 
  {
    id: 0,
    latitude: 48.8477397,
    longitude: 2.2579683,
  }

export const userSearchDataVar = makeVar<UserSearchData>(
  userSearchDataInitialValue
)

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchdata: {
          read () {
            return userSearchDataVar();
          }
        }
      }
    }
  }
});


const link = new HttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers
});


//TODO: delete hard-coded id
const myQuery = gql `
  query LoggedUserId {
    loggedUserId @client
  }
`;

cache.writeQuery({
  query: myQuery,
  data: {
    loggedUserId: 1,
  } 
});

export default client;