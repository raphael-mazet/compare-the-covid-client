import { gql, ApolloCache, Resolvers } from '@apollo/client';

export const typeDefs = gql`
  extend type Query {
    loggedUser: String!
  }

  extend type User {
    greenAlerts: any
    yellowAlerts: any
    redAlerts: any
  }

  extend type Mutation {
    addAlerts(green: any, yellow: any, red: any): any
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
}

export const resolvers = {};