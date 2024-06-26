import { useMutation, useQuery } from "@apollo/client";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

import { useState } from "react";

import styles from "./Todos.module.css";

import { ListSelector, ManageLists, TodoList } from "../";
import { ADD_TODO } from "../../apollo/mutations";
import { GET_LIST_NAMES, GET_TODOS } from "../../apollo/queries";
import { ACTIONS, updateTodosCache } from "../../apollo/updateCache";
import { Todo } from "../../interfaces";

const Todos = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const { data: dataListNames } = useQuery(GET_LIST_NAMES);
  const [todo, setTodo] = useState("");

  const [selectedListName, setSelectedListName] =
    useState<string>("default-view");

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateTodosCache(ACTIONS.ADD_TODO),
  });

  const addNewTodo = async (e: React.MouseEvent<HTMLElement | null>) => {
    if (todo) {
      addTodo({
        variables: {
          title: todo,
          listName: selectedListName,
          detail: "",
          date: new Date(),
          complete: false,
        },
      });
      setTodo("");
    }
  };

  if (loading) return <div data-testid='loading'>Loading...</div>;

  if (error) return <>Error...</>;

  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        boxShadow: 2,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
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

      {selectedListName === "manage-lists" && (
        <ManageLists dataListNames={dataListNames?.getListNames} />
      )}

      {selectedListName === "default-view" && <h2>Create and manage lists.</h2>}

      {selectedListName !== "manage-lists" &&
        selectedListName !== "default-view" && (
          <>
            <div className={styles.addTodo}>
              <input
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className={styles.addTodoInput}
                data-testid='add-todo-input'
                aria-label='add list item'
              />
              <Button
                className={styles.add}
                onClick={addNewTodo}
                variant='outlined'
                sx={{ marginLeft: "4px", padding: "6px", color: "black" }}
              >
                ADD
              </Button>
            </div>

            <h2>Active</h2>
            <TodoList
              filterFn={(todo: Todo) =>
                (todo.complete === false &&
                  todo.listName === selectedListName) ||
                (todo.complete === false && selectedListName === "view-all")
              }
              todos={data?.getTodos}
            />
            <h2>Complete</h2>
            <TodoList
              filterFn={(todo: Todo) =>
                (todo.complete === true &&
                  todo.listName === selectedListName) ||
                (todo.complete === true && selectedListName === "view-all")
              }
              todos={data?.getTodos}
            />
          </>
        )}
    </Card>
  );
};

export default Todos;
