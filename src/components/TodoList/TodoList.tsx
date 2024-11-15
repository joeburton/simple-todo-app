import { TodoItem } from '../';
import { Todo } from '../../interfaces';

import styles from './TodoList.module.css';

interface TodoListProps {
  filterFn?: (item: Todo) => boolean;
  todos: Todo[];
}

const TodoList = ({ filterFn = () => true, todos }: TodoListProps) => {
  // Use the filter function directly in the filter method
  const sortedTodos = todos.filter(filterFn);

  return (
    <ul className={styles.todosList}>
      {sortedTodos.map((todo) => (
        // Assuming 'id' is a unique identifier in the Todo type
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
