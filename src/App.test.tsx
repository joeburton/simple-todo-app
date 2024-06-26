import { ApolloProvider } from "@apollo/client";
import { render, screen } from "@testing-library/react";
import client from "./apollo/apolloClient";
import App from "./App";

test("should render the application", () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  expect(screen.getByTestId("task-manager")).toBeInTheDocument();
});
