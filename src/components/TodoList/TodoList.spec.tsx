import { render, screen } from "@testing-library/react";

import { ApolloProvider } from "@apollo/client";
import apolloClient from "../../apollo/apolloClient";

import TodoList from "./TodoList";
import { Todo } from "../../interfaces/index";

import { todos } from "../../../mocks/data";

describe("TodoList", () => {
  it("should render a TodoList", async () => {
    render(
      <ApolloProvider client={apolloClient}>
        <TodoList
          filterFn={(todo: Todo) =>
            todo.complete === false && todo.listName === "tech"
          }
          todos={todos}
        />
      </ApolloProvider>
    );

    await screen.findAllByTestId("todo-item");

    expect(screen.getAllByTestId("todo-item").length).toEqual(2);
  });
});
