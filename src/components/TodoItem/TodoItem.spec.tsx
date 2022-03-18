import { getByTestId, render, waitFor } from '@testing-library/react';

import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../apollo/apolloClient';

import TodoItem from './TodoItem';
import { Todos } from '../index';
import userEvent from '@testing-library/user-event';

import todos from '../../../mocks/data';

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

  it('should toggle the Todos status between active and complete', async () => {
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

    expect(getByText('My first todo 1')).not.toHaveClass('strikethrough');

    // toggle active
    userEvent.click(getByText('My first todo 1'));

    await waitFor(() =>
      expect(getByText('My first todo 1')).toHaveClass('strikethrough')
    );
  });

  it('should remove the todo', async () => {
    const { findByTestId, getByRole, getByTestId, getByText, queryByText } =
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

    userEvent.click(getByTestId('remove-todo'));

    await waitFor(() => expect(queryByText('My first todo 1')).toBeNull());
  });
});
