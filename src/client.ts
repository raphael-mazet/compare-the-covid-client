import {
  ApolloClient,
  HttpLink,
} from "@apollo/client";
import { resolvers, typeDefs } from './apis/graphQL/resolvers';
import { cache } from './apolloclient/memorycache'

const link = new HttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers
});

export default client;