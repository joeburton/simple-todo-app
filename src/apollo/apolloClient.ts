import { ApolloClient, InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
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
  uri: 'https://apollo-3-mongoose-integration.vercel.app/graphql',
  cache: cache,
});

export default client;
