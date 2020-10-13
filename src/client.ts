import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  // NormalizedCacheObject,
} from '@apollo/client';

const link = new HttpLink({ uri: 'https://compare-the-covid-server.herokuapp.com/'})
const cache = new InMemoryCache();

const client = new ApolloClient({
  link, cache
});


export default client;