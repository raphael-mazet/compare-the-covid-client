import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  // NormalizedCacheObject,
} from "@apollo/client";

const link = new HttpLink({
  uri: "http://localhost:4000",
});
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default client;
