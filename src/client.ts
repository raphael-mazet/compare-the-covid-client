import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  // NormalizedCacheObject,
} from "@apollo/client";
import { resolvers, typeDefs } from './apis/graphQL/resolvers';
import { gql } from '@apollo/client';

const link = new HttpLink({
  uri: "http://localhost:4000",
});
const cache = new InMemoryCache();  

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
