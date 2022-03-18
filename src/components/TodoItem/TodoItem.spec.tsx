import { render, waitFor } from '@testing-library/react';

import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../apollo/apolloClient';

import TodoItem from './TodoItem';
import { Todos } from '../index';
import userEvent from '@testing-library/user-event';

const todo = {
  id: '6228e38df41cdf8ac72bb1d0',
  listId: 'sdfsdf',
  title: 'My first todo',
  detail: 'so much detail',
  complete: true,
  date: '17/03/22',
};

describe('TodoItem', () => {
  it('should render a TodoItem', () => {
    const { getByTestId } = render(
      <ApolloProvider client={apolloClient}>
        <TodoItem todo={todo} />
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
});
