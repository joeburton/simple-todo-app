import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation, useQuery } from '@apollo/client';

import styles from './Todos.module.css';

import { TodoList, SelectMenu } from '../';
import { Todo } from '../../interfaces';
import { ADD_TODO } from '../../apollo/mutations';
import { GET_TODOS } from '../../apollo/queries';
import { updateCache, ACTIONS } from '../../apollo/updateCache';
import { ListSelector } from '../';

const Todos = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [selectedListId, setSelectedListId] = useState<string>('default');

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache(ACTIONS.ADD_NEW_TODO),
  });

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

  if (loading) return <div data-testid='loading'>Loading...</div>;

  if (error) return <>Error...</>;

  return (
    <>
      <ListSelector />
      <div className={styles.selectList} data-testid='todos-container'>
        <SelectMenu
          options={[
            { value: 'default', label: 'Select List' },
            { value: 'general', label: 'General' },
            { value: 'tech', label: 'Tech' },
          ]}
          onChange={(value) => {
            setSelectedListId(value);
          }}
          customStyles={{ minWidth: '200px', height: '38px' }}
        />
      </div>
      {selectedListId === 'default' && (
        <div className={styles.addList}>
          <input className={styles.addListInput} ref={newTodoListRef} />
          <Button
            className={styles.add}
            onClick={() => {
              // @todo need to look into list title further...
              // addTodo({
              //   variables: {
              //     listId: newTodoListRef?.current?.value,
              //     title: 'list',
              //     date: new Date(),
              //     complete: false,
              //   },
              // });
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
            todos={data?.getTodos}
          />
          <h2>Complete</h2>
          <TodoList
            filterFn={(todo: Todo) =>
              todo.complete === true && todo.listId === selectedListId
            }
            todos={data?.getTodos}
          />
        </>
      )}
    </>
  );
};

export default Todos;
