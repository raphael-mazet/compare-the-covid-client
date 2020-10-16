import { gql, ApolloCache, Resolvers } from '@apollo/client';

export const typeDefs = gql`
  # extend type Query {
  #   # greenAlerts: any
  #   # yellowAlerts: any
  #   # redAlerts: any
  #   # authenticatedUser: AuthenticatedUser
  # }

  extend type Location {
    events: [Events]
  }
`

type ResolverFn = (
  parent: any,
  args: any,
  { cache } : { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  // We will update this with our app's resolvers later
}

export const resolvers = {
//NOTE: add client-side resolvers if needed
};

