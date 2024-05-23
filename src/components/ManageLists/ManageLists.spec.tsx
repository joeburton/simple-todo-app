import { ApolloProvider } from "@apollo/client";
import { render, screen } from "@testing-library/react";
import apolloClient from "../../apollo/apolloClient";

import ManageLists from "./ManageLists";
import { listNames } from "../../../mocks/data";

describe("ManageLists", () => {
  it("should render the ManageLists component", () => {
    render(
      <ApolloProvider client={apolloClient}>
        <ManageLists dataListNames={listNames} />
      </ApolloProvider>
    );
    expect(screen.getByTestId("manage-lists")).toBeDefined();
  });
});
