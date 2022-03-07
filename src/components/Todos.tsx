import TodoList from './TodoList';
import Todo from './TodoInterface';

const Todos = () => {
  return (
    <>
      <h2>Active</h2>
      <TodoList filterFn={(todo: Todo) => todo.complete === false} />
      <h2>Complete</h2>
      <TodoList filterFn={(todo: Todo) => todo.complete === true} />
    </>
  );
};

export default Todos;
