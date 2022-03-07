import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://apollo-3-mongoose-integration.vercel.app/graphql',
  cache: new InMemoryCache(),
});

export default client;
