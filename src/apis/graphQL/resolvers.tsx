import { gql, ApolloCache, Resolvers } from '@apollo/client';

export const typeDefs = gql`
  extend type Query {
    loggedUserId: Number
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

//TODO: add to interfaces
// interface AppResolvers extends Resolvers {
// }

export const resolvers = {

  
};


// const myQuery = gql `
// query loggedUserId {
// loggedUserId @client
// }
// `
// const {data: whatevs} = useQuery(myQuery)
// if (whatevs) console.log(whatevs);


// const myQuery = gql `
// query loggedUserId {
//   loggedUserId @client
// }
// `


