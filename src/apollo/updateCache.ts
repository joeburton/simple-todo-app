import Todo from '../components/TodoInterface';
import { GET_TODOS } from './queries';

export type Action = 'TOGGLE' | 'DELETE' | 'ADD_TODO';

export const updateCache = (todo: Todo, action: Action) => {
  return (cache: any) => {
    let { getTodos } = cache.readQuery({ query: GET_TODOS });
    let updatedTodos;

    if (action === 'DELETE') {
      updatedTodos = getTodos?.filter((item: Todo) => item.id !== todo.id);
    }

    if (action === 'TOGGLE') {
      updatedTodos = getTodos?.map((item: Todo) =>
        item.id === todo.id ? { ...item, complete: !item.complete } : item
      );
    }

    if (action === 'ADD_TODO') {
      updatedTodos = [...getTodos, todo];
    }

    cache.writeQuery({
      query: GET_TODOS,
      data: {
        getTodos: updatedTodos,
      },
    });
  };
};
