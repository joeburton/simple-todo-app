import { ApolloProvider } from "@apollo/client";
import { render, screen } from "@testing-library/react";

import apolloClient from "../../apollo/apolloClient";

import SelectList from "./SelectList";

describe("SelectList", () => {
  it("should render the SelectList component", async () => {
    render(
      <ApolloProvider client={apolloClient}>
        <SelectList />
      </ApolloProvider>
    );

    await screen.findByTestId("Default");

    expect(screen.getByTestId("select-list")).toBeDefined();
  });
});
