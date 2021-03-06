import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../apollo/apolloClient';

import Todos from './Todos';

describe('Todos', () => {
  it('should render the entire Todos App', async () => {
    const { getAllByTestId, findByTestId, getByRole, getByTestId } = render(
      <ApolloProvider client={apolloClient}>
        <Todos />
      </ApolloProvider>
    );

    await findByTestId('list-selector');

    userEvent.selectOptions(
      // Find the select element
      getByTestId('select-menu'),
      // Find and select the Tech option
      getByRole('option', { name: 'Tech' })
    );

    await waitFor(() => expect(getAllByTestId('todo-item').length).toEqual(2));
  });

  it('should add a new todo', async () => {
    const { findByTestId, getByRole, getByTestId, getByText, getAllByTestId } =
      render(
        <ApolloProvider client={apolloClient}>
          <Todos />
        </ApolloProvider>
      );

    await findByTestId('list-selector');

    userEvent.selectOptions(
      // Find the select element
      getByTestId('select-menu'),
      // Find and select the Tech option
      getByRole('option', { name: 'Tech' })
    );

    await waitFor(() => expect(getAllByTestId('todo-item').length).toEqual(2));

    const addTodoInput = getByTestId('add-todo-input');

    userEvent.type(addTodoInput, 'new todo');

    expect(addTodoInput).toHaveValue('new todo');

    userEvent.click(getByText('ADD'));

    await waitFor(() => expect(getByText('new todo')).toBeInTheDocument());

    await waitFor(() => expect(getAllByTestId('todo-item').length).toEqual(3));
  });
});
