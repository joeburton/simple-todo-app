import { TodoItem } from '../';
import { Todo } from '../../interfaces';
import { Key } from 'react';

import styles from './TodoList.module.css';

interface TodoListProps {
  filterFn?: (item: Todo) => boolean;
  todos: Todo[];
}

const TodoList = ({ filterFn, todos }: TodoListProps) => {
  const sortedTodos = filterFn ? todos?.filter(filterFn) : todos;

  return (
    <ul className={styles.todosList}>
      {sortedTodos.map((todo: Todo, i: Key | null | undefined) => (
        <TodoItem key={i} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
