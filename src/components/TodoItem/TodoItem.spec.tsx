import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../apollo/apolloClient';
import todos from '../../../mocks/data';

import TodoItem from './TodoItem';
import { Todos } from '../index';

describe('TodoItem', () => {
  it('should render a TodoItem', () => {
    const { getByTestId } = render(
      <ApolloProvider client={apolloClient}>
        <TodoItem todo={todos[0]} />
      </ApolloProvider>
    );

    const todoItem = getByTestId('todo-item');
    expect(todoItem).toBeDefined();
  });

  it("should toggle a Todo's status between complte and active", async () => {
    const { findByTestId, getByRole, getByText } = render(
      <ApolloProvider client={apolloClient}>
        <Todos />
      </ApolloProvider>
    );

    await findByTestId('todos-container');

    userEvent.selectOptions(
      // Find the select element
      getByRole('combobox'),
      // Find and select the Tech option
      getByRole('option', { name: 'Tech' })
    );

    expect(getByText('My first todo 1')).toHaveClass('strikethrough');

    // toggle active
    userEvent.click(getByText('My first todo 1'));

    await waitFor(() =>
      expect(getByText('My first todo 1')).not.toHaveClass('strikethrough')
    );
  });

  it('should remove a todo', async () => {
    const { findByTestId, getByRole, getAllByTestId, getByText, queryByText } =
      render(
        <ApolloProvider client={apolloClient}>
          <Todos />
        </ApolloProvider>
      );

    await findByTestId('todos-container');

    userEvent.selectOptions(
      // Find the select element
      getByRole('combobox'),
      // Find and select the Tech option
      getByRole('option', { name: 'Tech' })
    );

    expect(getByText('My first todo 1')).toBeDefined();

    userEvent.click(getAllByTestId('remove-todo')[0]);

    await waitFor(() => expect(queryByText('My first todo 1')).toBeNull());
  });
});
