import { render } from '@testing-library/react';

import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../apollo/apolloClient';

import TodoList from './TodoList';
import { Todo } from '../../interfaces/index';

import { todos } from '../../../mocks/data';

describe('TodoList', () => {
  it('should render a TodoList', async () => {
    const { findAllByTestId, queryAllByTestId } = render(
      <ApolloProvider client={apolloClient}>
        <TodoList
          filterFn={(todo: Todo) =>
            todo.complete === false && todo.listId === 'tech'
          }
          todos={todos}
        />
      </ApolloProvider>
    );

    await findAllByTestId('todo-item');

    expect(queryAllByTestId('todo-item').length).toEqual(2);
  });
});
