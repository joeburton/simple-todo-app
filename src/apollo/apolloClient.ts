import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        getTodos: {
          merge(_existing, incoming) {
            console.log(incoming);
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: cache,
});

export default client;
