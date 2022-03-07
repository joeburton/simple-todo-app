import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';

import Todo from './TodoInterface';

import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const removeTodo = (e: React.MouseEvent<SVGElement>) => {
    console.log('remove todo', todo);
  };

  const markComplete = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('remove todo');
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
