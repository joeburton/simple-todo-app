import Todo from '../components/TodoInterface';
import { GET_TODOS } from './queries';

enum ACTIONS {
  TOGGLE,
  DELETE,
  ADD_TODO,
  UPDATE_TODOS,
}

const updateCache = (action: ACTIONS, todo?: Todo) => {
  return (cache: any, response: any) => {
    console.log(response);

    let { getTodos } = cache.readQuery({ query: GET_TODOS });
    let updatedTodos;

    if (action === ACTIONS.TOGGLE) {
      updatedTodos = getTodos?.map((item: Todo) =>
        item.id === todo?.id ? { ...item, complete: !item.complete } : item
      );
    }

    if (action === ACTIONS.DELETE) {
      updatedTodos = getTodos?.filter((item: Todo) => item.id !== todo?.id);
    }

    if (action === ACTIONS.UPDATE_TODOS) {
      updatedTodos = [...getTodos, response.data.addTodo];
    }

    cache.writeQuery({
      query: GET_TODOS,
      data: {
        getTodos: updatedTodos,
      },
    });
  };
};

export { ACTIONS, updateCache };
