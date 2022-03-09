import { useRef } from 'react';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';

import TodoList from './TodoList';
import Todo from './TodoInterface';

import styles from './Todos.module.css';
import { ADD_TODO } from '../apollo/mutations';
import { updateCache, ACTIONS } from '../apollo/updateCache';

const Todos = () => {
  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache(ACTIONS.UPDATE_TODOS),
  });

  const newTodoRef = useRef<HTMLInputElement>(null);

  const addNewTodo = async () => {
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
  };

  return (
    <>
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
      <TodoList filterFn={(todo: Todo) => todo.complete === false} />
      <h2>Complete</h2>
      <TodoList filterFn={(todo: Todo) => todo.complete === true} />
    </>
  );
};

export default Todos;
