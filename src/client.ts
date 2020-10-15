import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  // NormalizedCacheObject,
} from "@apollo/client";
import { resolvers, typeDefs } from './resolvers';

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

export default client;
