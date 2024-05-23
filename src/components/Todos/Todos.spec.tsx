import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ApolloProvider } from "@apollo/client";
import apolloClient from "../../apollo/apolloClient";

import Todos from "./Todos";

describe("Todos", () => {
  it("should render the entire Todos App", async () => {
    render(
      <ApolloProvider client={apolloClient}>
        <Todos />
      </ApolloProvider>
    );

    await screen.findByTestId("list-selector");

    userEvent.selectOptions(
      // Find the select element
      screen.getByTestId("select-menu"),
      // Find and select the Tech option
      screen.getByRole("option", { name: "Tech" })
    );

    await waitFor(() =>
      expect(screen.getAllByTestId("todo-item").length).toEqual(2)
    );
  });

  it("should add a new todo", async () => {
    render(
      <ApolloProvider client={apolloClient}>
        <Todos />
      </ApolloProvider>
    );

    await screen.findByTestId("list-selector");

    userEvent.selectOptions(
      // Find the select element
      screen.getByTestId("select-menu"),
      // Find and select the Tech option
      screen.getByRole("option", { name: "Tech" })
    );

    await waitFor(() =>
      expect(screen.getAllByTestId("todo-item").length).toEqual(2)
    );

    const addTodoInput = screen.getByTestId("add-todo-input");

    userEvent.type(addTodoInput, "new todo");

    expect(addTodoInput).toHaveValue("new todo");

    userEvent.click(screen.getByText("ADD"));

    await screen.findByText("new todo");

    await waitFor(() =>
      expect(screen.getAllByTestId("todo-item").length).toEqual(3)
    );
  });
});
