import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import apolloClient from '../../apollo/apolloClient';
import Todos from './Todos';
describe.skip('Todos', () => {
  it('should render the Todos App', async () => {
    const { findByTestId } = render(
      <ApolloProvider client={apolloClient}>
        <Todos />
      </ApolloProvider>
    );

    await findByTestId('todos-container');

    expect(findByTestId('todos-container')).toBeInTheDocument();
  });
});
