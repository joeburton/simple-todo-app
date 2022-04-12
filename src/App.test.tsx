import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import client from './apollo/apolloClient';
import App from './App';

test('renders learn react link', () => {
  const { getByTestId } = render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  expect(getByTestId('simple-todo-app')).toBeInTheDocument();
});
