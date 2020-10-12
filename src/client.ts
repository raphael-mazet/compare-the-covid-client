import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  // NormalizedCacheObject,
} from '@apollo/client';
import gql from 'graphql-tag';

const link = new HttpLink({uri: 'http://localhost:4000/'})
const cache = new InMemoryCache();

const client = new ApolloClient({
  link, cache
});

// const query = gql`
//   {
//     characters {
//       results {
//         name
//       }
//     }
//   }
// `
// client.query({query})
//   .then(result => console.log(result))


export default client;