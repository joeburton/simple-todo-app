import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../apollo/apolloClient';

import Todos from './Todos';

describe('TodoItem', () => {
  it('should render a TodoItem', async () => {
    const { getByTestId } = render(
      <ApolloProvider client={apolloClient}>
        <Todos />
      </ApolloProvider>
    );

    await waitFor(() => expect(getByTestId('todo-item')).toBeInTheDocument());
  });

  it('should add a new todo', async () => {
    const { getByTestId, getByText, queryAllByTestId } = render(
      <ApolloProvider client={apolloClient}>
        <Todos />
      </ApolloProvider>
    );

    await waitFor(() => expect(getByTestId('todo-item')).toBeInTheDocument());

    const addTodoInput = getByTestId('add-todo-input');

    userEvent.type(addTodoInput, 'my new todo text');

    expect(addTodoInput).toHaveValue('my new todo text');

    userEvent.click(getByText('ADD'));

    await waitFor(() =>
      expect(queryAllByTestId('todo-item').length).toEqual(2)
    );

    expect(getByText('new todo')).toBeInTheDocument();
  });
});
