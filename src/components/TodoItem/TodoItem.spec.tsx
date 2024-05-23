import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ApolloProvider } from "@apollo/client";
import apolloClient from "../../apollo/apolloClient";
import { todos } from "../../../mocks/data";

import TodoItem from "./TodoItem";
import { Todos } from "../index";

describe("TodoItem", () => {
  it("should render a TodoItem", () => {
    render(
      <ApolloProvider client={apolloClient}>
        <TodoItem todo={todos[0]} />
      </ApolloProvider>
    );

    const todoItem = screen.getByTestId("todo-item");
    expect(todoItem).toBeDefined();
  });

  it("should toggle a Todo's status between active and complete", async () => {
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

    expect(screen.getByText("My first todo 1")).not.toHaveClass(
      "strikethrough"
    );

    // toggle active
    userEvent.click(screen.getByText("My first todo 1"));

    await waitFor(() =>
      expect(screen.getByText("My first todo 1")).toHaveClass("strikethrough")
    );
  });

  it("should remove a todo", async () => {
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

    expect(screen.getByText("My first todo 1")).toBeDefined();

    userEvent.click(screen.getAllByTestId("remove-todo")[1]);

    await waitFor(() =>
      expect(screen.queryByText("My first todo 1")).toBeNull()
    );
  });
});
