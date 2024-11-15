import { useMutation } from '@apollo/client';
import { DeleteIcon, TargetIcon } from '../CustomIcons';

import { DELETE_TODO, UPDATE_TODO } from '../../apollo/mutations';
import { ACTIONS, updateTodosCache } from '../../apollo/updateCache';
import { Todo } from '../../interfaces';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [updateTodo, { loading }] = useMutation(UPDATE_TODO, {
    update: updateTodosCache(ACTIONS.TOGGLE_TODO, todo),
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    update: updateTodosCache(ACTIONS.DELETE_TODO, todo),
  });

  const removeTodo = (e: React.MouseEvent<SVGElement>) => {
    deleteTodo({
      variables: { id: todo.id },
    });
  };

  const markComplete = (e: React.MouseEvent<HTMLDivElement>) => {
    updateTodo({
      variables: { id: todo.id, complete: !todo?.complete },
    });
  };

  const complete = todo.complete ? `strikethrough` : ``;
  // const status = todo.complete ? `statusComplete` : `statusActive`;

  return (
    <li data-testid="todo-item" className={loading ? 'loading' : ''}>
      <div className={styles.text} onClick={markComplete}>
        <TargetIcon />
        <span className={styles[complete]}>{todo.title}</span>
      </div>
      <DeleteIcon testId="remove-todo" onClick={removeTodo} />
    </li>
  );
};

export default TodoItem;
