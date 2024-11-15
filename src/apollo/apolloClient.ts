import { ApolloClient, InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        getTodos: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
        getListNames: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const env = process.env.NODE_ENV;
let graph: string = '';

// console.log(env);

switch (env) {
  case 'test':
    graph = 'http://localhost:3000';
    break;
  case 'development':
    graph = 'http://localhost:4000/graphql';
    break;
  case 'production':
    graph = 'https://simple-todo-app-graphql.vercel.app/graphql';
    break;
}

const client = new ApolloClient({
  uri: graph,
  cache: cache,
});

export default client;
