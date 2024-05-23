import { ApolloProvider } from "@apollo/client";
import { render, screen } from "@testing-library/react";
import apolloClient from "../../apollo/apolloClient";

import { listNames } from "../../../mocks/data";

import ListSelector from "./ListSelector";

describe("ListSelector", () => {
  it("should render the SelectMenu and all options", () => {
    render(
      <ApolloProvider client={apolloClient}>
        <ListSelector
          setSelectedListName={(e) => {}}
          dataListNames={listNames}
          selectedOption=''
        />
      </ApolloProvider>
    );
    expect(screen.getByTestId("list-selector")).toBeDefined();
  });
});
