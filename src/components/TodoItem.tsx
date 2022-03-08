import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import { useMutation } from '@apollo/client';

import { UPDATE_TODO, DELETE_TODO } from '../apollo/mutations';
import { GET_TODOS } from '../apollo/queries';
import Todo from './TodoInterface';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
}

type Action = 'TOGGLE' | 'DELETE';

const updateCache = (todo: Todo, action: Action) => {
  return (cache: any) => {
    let { getTodos } = cache.readQuery({ query: GET_TODOS });
    let updatedTodos;

    if (action === 'DELETE') {
      updatedTodos = getTodos?.filter((item: Todo) => item.id !== todo.id);
    }

    if (action === 'TOGGLE') {
      updatedTodos = getTodos?.map((item: Todo) =>
        item.id === todo.id ? { ...item, complete: !item.complete } : item
      );
    }

    cache.writeQuery({
      query: GET_TODOS,
      data: {
        getTodos: updatedTodos,
      },
    });
  };
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [updateTodo] = useMutation(UPDATE_TODO, {
    update: updateCache(todo, 'TOGGLE'),
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    update: updateCache(todo, 'DELETE'),
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
  const status = todo.complete ? `statusComplete` : `statusActive`;

  return (
    <li>
      <div className={styles.text} onClick={markComplete}>
        <ModeStandbyIcon
          sx={{ fontSize: '1.2rem' }}
          className={styles[status]}
        />
        <span className={styles[complete]}>{todo.title}</span>
      </div>
      <DeleteOutlineIcon onClick={removeTodo} className={styles.deleteIcon} />
    </li>
  );
};

export default TodoItem;
