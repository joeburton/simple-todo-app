import { useMutation } from "@apollo/client";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";

import { DELETE_TODO, UPDATE_TODO } from "../../apollo/mutations";
import { ACTIONS, updateTodosCache } from "../../apollo/updateCache";
import { Todo } from "../../interfaces";
import styles from "./TodoItem.module.css";

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
  const status = todo.complete ? `statusComplete` : `statusActive`;

  return (
    <li data-testid='todo-item' className={loading ? "loading" : ""}>
      <div className={styles.text} onClick={markComplete}>
        <ModeStandbyIcon
          sx={{ fontSize: "1.2rem" }}
          className={styles[status]}
        />
        <span className={styles[complete]}>{todo.title}</span>
      </div>
      <DeleteOutlineIcon
        data-testid='remove-todo'
        onClick={removeTodo}
        className={styles.deleteIcon}
      />
    </li>
  );
};

export default TodoItem;
