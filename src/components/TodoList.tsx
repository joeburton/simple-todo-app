import { useQuery } from '@apollo/client';

import TodoItem from './TodoItem';
import Todo from './TodoInterface';
import { GET_TODOS } from '../apollo/queries';
import { Key } from 'react';

import styles from './TodoList.module.css';

interface TodoListProps {
  filterFn?: (item: Todo) => boolean;
}

const TodoList = ({ filterFn }: TodoListProps) => {
  const { loading, error, data } = useQuery(GET_TODOS);

  const sortedTodos = filterFn
    ? data?.getTodos?.filter(filterFn)
    : data?.getTodos;

  if (loading) return <>Loading...</>;

  if (error) return <>Error...</>;

  return (
    <ul className={styles.todosList}>
      {sortedTodos.map((todo: Todo, i: Key | null | undefined) => (
        <TodoItem key={i} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
