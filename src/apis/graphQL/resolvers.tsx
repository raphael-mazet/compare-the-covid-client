import { gql } from '@apollo/client';

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

// type ResolverFn = (
//   parent: any,
//   args: any,
//   { cache } : { cache: ApolloCache<any> }
// ) => any;

export const resolvers = {
//NOTE: add client-side resolvers if needed
};

