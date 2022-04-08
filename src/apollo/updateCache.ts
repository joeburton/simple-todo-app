import { Todo } from '../interfaces';
import { GET_TODOS, GET_LIST_NAMES } from './queries';

enum ACTIONS {
  TOGGLE_TODO,
  DELETE_TODO,
  ADD_NEW_TODO,
  ADD_LIST,
  DELETE_LIST,
}

const updateTodosCache = (action: ACTIONS, todo?: Todo) => {
  return (cache: any, response: any) => {
    let { getTodos } = cache.readQuery({ query: GET_TODOS });
    let updatedTodos;

    if (action === ACTIONS.TOGGLE_TODO) {
      updatedTodos = getTodos?.map((item: Todo) =>
        item.id === todo?.id ? { ...item, complete: !item.complete } : item
      );
    }

    if (action === ACTIONS.DELETE_TODO) {
      updatedTodos = getTodos?.filter((item: Todo) => item.id !== todo?.id);
    }

    if (action === ACTIONS.ADD_NEW_TODO) {
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

interface ListName {
  listName?: string;
  id?: string;
}

const updateListNamesCache = (action: ACTIONS, listName: ListName) => {
  return (cache: any, response: any) => {
    let { getListNames } = cache.readQuery({ query: GET_LIST_NAMES });
    let updatedListNames;

    if (action === ACTIONS.ADD_LIST) {
      updatedListNames = [...getListNames, response.data.addListName];
    }

    if (action === ACTIONS.DELETE_LIST) {
      updatedListNames = getListNames.filter(
        (item: ListName) => item.id !== listName.id
      );
    }

    cache.writeQuery({
      query: GET_LIST_NAMES,
      data: {
        getListNames: updatedListNames,
      },
    });
  };
};

export { ACTIONS, updateTodosCache, updateListNamesCache };
