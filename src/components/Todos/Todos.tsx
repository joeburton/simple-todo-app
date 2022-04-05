import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation, useQuery } from '@apollo/client';

import styles from './Todos.module.css';

import { TodoList } from '../';
import { Todo } from '../../interfaces';
import { ADD_TODO, ADD_LIST_ID } from '../../apollo/mutations';
import { GET_TODOS, GET_LIST_IDS } from '../../apollo/queries';
import { updateCache, ACTIONS } from '../../apollo/updateCache';
import { ListSelector } from '../';

const Todos = () => {
  const {
    loading: loadingTodos,
    error: errorTodos,
    data: dataTodos,
  } = useQuery(GET_TODOS);

  const { data: dataListIds } = useQuery(GET_LIST_IDS);

  const [selectedListId, setSelectedListId] = useState<string>('default');

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache(ACTIONS.ADD_NEW_TODO),
  });

  const [addListId] = useMutation(ADD_LIST_ID);

  const newTodoRef = useRef<HTMLInputElement>(null);
  const newTodoListRef = useRef<HTMLInputElement>(null);

  const addNewTodo = async (e: React.MouseEvent<HTMLElement | null>) => {
    e.preventDefault();
    if (newTodoRef?.current?.value) {
      const todo = {
        title: newTodoRef?.current?.value,
        listId: selectedListId,
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

  if (loadingTodos) return <div data-testid='loading'>Loading...</div>;

  if (errorTodos) return <>Error...</>;

  return (
    <>
      {dataListIds && (
        <ListSelector
          setSelectedListId={setSelectedListId}
          dataListIds={dataListIds?.getListIds}
        />
      )}
      {selectedListId === 'default' && (
        <div className={styles.addList}>
          <input className={styles.addListInput} ref={newTodoListRef} />
          <Button
            className={styles.add}
            onClick={() => {
              addListId({
                variables: {
                  listId: newTodoListRef?.current?.value,
                },
              });
            }}
            variant='outlined'
            sx={{ marginLeft: '4px', padding: '6px', color: 'black' }}
          >
            ADD LIST
          </Button>
        </div>
      )}
      {selectedListId !== 'default' && (
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
              todo.complete === false && todo.listId === selectedListId
            }
            todos={dataTodos?.getTodos}
          />
          <h2>Complete</h2>
          <TodoList
            filterFn={(todo: Todo) =>
              todo.complete === true && todo.listId === selectedListId
            }
            todos={dataTodos?.getTodos}
          />
        </>
      )}
    </>
  );
};

export default Todos;
