import { ApolloClient, InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        getTodos: {
          merge(_existing, incoming) {
            // console.log(_existing, incoming);
            return incoming;
          },
        },
        getListNames: {
          merge(_existing, incoming) {
            // console.log(_existing, incoming);
            return incoming;
          },
        },
      },
    },
  },
});

const env = process.env.NODE_ENV;
let graph: string = '';

switch (env) {
  case 'test':
    graph = 'http://localhost:3000';
    break;
  default:
    graph = 'https://apollo-3-mongoose-integration.vercel.app/graphql';
    // graph = 'http://localhost:4000/graphql';
    break;
}

const client = new ApolloClient({
  uri: graph,
  cache: cache,
});

export default client;
