import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation, useQuery } from '@apollo/client';

import { TodoList, SelectMenu } from '../';
import { Todo } from '../../interfaces';

import styles from './Todos.module.css';
import { ADD_TODO } from '../../apollo/mutations';
import { GET_TODOS } from '../../apollo/queries';
import { updateCache, ACTIONS } from '../../apollo/updateCache';

const Todos = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [selectedListId, setSelectedListId] = useState<string>('default');

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache(ACTIONS.ADD_NEW_TODO),
  });

  const newTodoRef = useRef<HTMLInputElement>(null);

  const addNewTodo = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (newTodoRef?.current?.value) {
      const todo = {
        title: newTodoRef?.current?.value,
        listId: selectedListId,
        detail: '',
        date: new Date(),
        complete: false,
      } as Todo;

      if (newTodoRef.current) {
        addTodo({
          variables: todo,
        });
      }
    }
  };

  if (loading) return <>Loading...</>;

  if (error) return <>Error...</>;

  return (
    <>
      <div className={styles.selectList}>
        <SelectMenu
          options={[
            { value: 'default', label: 'Select List' },
            { value: 'general', label: 'General' },
            { value: 'tech', label: 'Tech' },
          ]}
          value={selectedListId}
          onChange={(value) => {
            console.log('lisp', value);
            setSelectedListId(value);
          }}
          styles={{ minWidth: '200px', height: '38px' }}
        />
      </div>
      <div className={styles.addTodo}>
        <input ref={newTodoRef} className={styles.todo} />
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
  );
};

export default Todos;
