import { gql, ApolloCache, Resolvers } from '@apollo/client';

export const typeDefs = gql`
  extend type Query {
    loggedUserId: Number,
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

//TODO: add to resolver interface for typescript
// interface AppResolvers extends Resolvers {
// }

export const resolvers = {
//NOTE: add client-side resolvers if needed
};

