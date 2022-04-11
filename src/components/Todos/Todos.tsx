import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation, useQuery } from '@apollo/client';

import styles from './Todos.module.css';

import { Todo } from '../../interfaces';
import { ADD_TODO } from '../../apollo/mutations';
import { GET_TODOS, GET_LIST_NAMES } from '../../apollo/queries';
import { updateTodosCache, ACTIONS } from '../../apollo/updateCache';
import { ListSelector, ManageLists, TodoList } from '../';

const Todos = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  const { data: dataListNames } = useQuery(GET_LIST_NAMES);

  const [selectedListName, setSelectedListName] =
    useState<string>('manage-lists');

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateTodosCache(ACTIONS.ADD_NEW_TODO),
  });

  const newTodoRef = useRef<HTMLInputElement>(null);

  const addNewTodo = async (e: React.MouseEvent<HTMLElement | null>) => {
    e.preventDefault();
    if (newTodoRef?.current?.value) {
      const todo = {
        title: newTodoRef?.current?.value,
        listName: selectedListName,
        detail: '',
        date: new Date(),
        complete: false,
      };

      if (newTodoRef.current) {
        addTodo({
          variables: todo,
        });
        newTodoRef.current.value = '';
      }
    }
  };

  if (loading) return <div data-testid='loading'>Loading...</div>;

  if (error) return <>Error...</>;

  return (
    <>
      {dataListNames && (
        <ListSelector
          setSelectedListName={setSelectedListName}
          dataListNames={dataListNames?.getListNames}
          selectedOption={selectedListName}
        />
      )}
      {selectedListName === 'manage-lists' && (
        <ManageLists dataListNames={dataListNames?.getListNames} />
      )}

      {selectedListName !== 'manage-lists' && (
        <>
          <div className={styles.addTodo}>
            <input
              ref={newTodoRef}
              className={styles.addTodoInput}
              data-testid='add-todo-input'
            />
            <Button
              className={styles.add}
              onClick={addNewTodo}
              variant='outlined'
              sx={{ marginLeft: '4px', padding: '6px', color: 'black' }}
            >
              ADD
            </Button>
          </div>

          <h2>Active</h2>
          <TodoList
            filterFn={(todo: Todo) =>
              todo.complete === false && todo.listName === selectedListName
            }
            todos={data?.getTodos}
          />
          <h2>Complete</h2>
          <TodoList
            filterFn={(todo: Todo) =>
              todo.complete === true && todo.listName === selectedListName
            }
            todos={data?.getTodos}
          />
        </>
      )}
    </>
  );
};

export default Todos;
