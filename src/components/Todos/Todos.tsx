import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

import styles from './Todos.module.css';

import { ListSelector, ManageLists, TodoList, CustomButton } from '../';
import { ADD_TODO } from '../../apollo/mutations';
import { GET_LIST_NAMES, GET_TODOS } from '../../apollo/queries';
import { ACTIONS, updateTodosCache } from '../../apollo/updateCache';
import { Todo } from '../../interfaces';

const Todos = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const { data: dataListNames } = useQuery(GET_LIST_NAMES);
  const [todo, setTodo] = useState('');

  const [selectedListName, setSelectedListName] =
    useState<string>('default-view');

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateTodosCache(ACTIONS.ADD_TODO),
  });

  const addNewTodo = async (e: React.MouseEvent<HTMLElement | null>) => {
    if (todo) {
      addTodo({
        variables: {
          title: todo,
          listName: selectedListName,
          detail: '',
          date: new Date(),
          complete: false,
        },
      });
      setTodo('');
    }
  };

  if (loading) return <div data-testid="loading">Loading...</div>;

  if (error) return <>Error...</>;

  return (
    <div
      style={{
        backgroundColor: '#fff',
        boxShadow:
          '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        borderRadius: '5px',
        padding: '16px',
        minWidth: '300px',
      }}
    >
      <h1>Task Manager</h1>
      {dataListNames && (
        <ListSelector
          setSelectedListName={setSelectedListName}
          selectedOption={selectedListName}
          dataListNames={dataListNames?.getListNames}
        />
      )}

      {selectedListName === 'manage-lists' && (
        <ManageLists dataListNames={dataListNames?.getListNames} />
      )}

      {selectedListName === 'default-view' && <h2>Create and manage lists.</h2>}

      {selectedListName !== 'manage-lists' &&
        selectedListName !== 'default-view' && (
          <>
            <div className={styles.addTodo}>
              <input
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className={styles.addTodoInput}
                data-testid="add-todo-input"
                aria-label="add list item"
              />
              <CustomButton onClick={addNewTodo} buttonText="ADD" />
            </div>

            <h2>Active</h2>
            <TodoList
              filterFn={(todo: Todo) =>
                (todo.complete === false &&
                  todo.listName === selectedListName) ||
                (todo.complete === false && selectedListName === 'view-all')
              }
              todos={data?.getTodos}
            />
            <h2>Complete</h2>
            <TodoList
              filterFn={(todo: Todo) =>
                (todo.complete === true &&
                  todo.listName === selectedListName) ||
                (todo.complete === true && selectedListName === 'view-all')
              }
              todos={data?.getTodos}
            />
          </>
        )}
    </div>
  );
};

export default Todos;
