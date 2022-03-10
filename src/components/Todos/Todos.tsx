import { useRef } from 'react';
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

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache(ACTIONS.ADD_NEW_TODO),
  });

  const newTodoRef = useRef<HTMLInputElement>(null);

  const addNewTodo = async () => {
    if (newTodoRef?.current?.value) {
      const todo = {
        title: newTodoRef?.current?.value,
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
            { value: 'default', label: 'Select a list' },
            { value: 'second', label: 'Second item' },
          ]}
          value={'second'}
          onChange={() => {
            console.log('lisp');
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
        filterFn={(todo: Todo) => todo.complete === false}
        todos={data?.getTodos}
      />
      <h2>Complete</h2>
      <TodoList
        filterFn={(todo: Todo) => todo.complete === true}
        todos={data?.getTodos}
      />
    </>
  );
};

export default Todos;
