import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  makeVar,
} from "@apollo/client";
import { resolvers, typeDefs } from './apis/graphQL/resolvers';
import { gql } from '@apollo/client';

interface Geometry {
  id?: number,
  latitude: number,
  longitude: number,
}

const geometrysInitialValue: Geometry = 
  {
    id: 0,
    latitude: 500,
    longitude: 600,
  }

export const geometrysVar = makeVar<Geometry>(
  geometrysInitialValue
)

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchdata: {
          read () {
            return geometrysVar();
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