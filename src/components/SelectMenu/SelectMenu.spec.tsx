import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SelectMenu from "./SelectMenu";

const renderSelectMenu = () => {
  return {
    ...render(
      <SelectMenu
        options={[
          { value: "default", label: "Select List" },
          { value: "general", label: "General" },
          { value: "tech", label: "Tech" },
        ]}
        onChange={(value) => {}}
        customStyles={{ minWidth: "200px", height: "38px" }}
      />
    ),
  };
};

describe("SelectMenu", () => {
  it("should render the SelectMenu and all options", () => {
    renderSelectMenu();
    expect(screen.getByTestId("select-menu")).toBeDefined();
    expect(screen.getAllByRole("option").length).toEqual(3);
  });

  it("should have the default value selected", () => {
    renderSelectMenu();

    expect(
      (screen.getByText("Select List") as HTMLOptionElement).selected
    ).toBeTruthy();
    expect(
      (screen.getByText("Select List") as HTMLOptionElement).value
    ).toEqual("default");
  });

  it("should allow a user to select a different option from the select menu, attempt 1", () => {
    renderSelectMenu();
    userEvent.selectOptions(
      // Find the select element
      screen.getByTestId("select-menu"),
      // Find and select the General option
      screen.getByRole("option", { name: "General" })
    );

    const selectMenu = screen.getByRole("option", {
      name: "General",
    }) as HTMLOptionElement;

    expect(selectMenu.selected).toBe(true);
    expect(
      (screen.getByText("General") as HTMLOptionElement).selected
    ).toBeTruthy();
    expect(
      (screen.queryByText("Tech") as HTMLOptionElement).selected
    ).toBeFalsy();
  });

  it("should allow a user to select a different option from the select menu, attempt 2", () => {
    renderSelectMenu();
    userEvent.selectOptions(
      // Find the select element
      screen.getByTestId("select-menu"),
      // Find and select the Tech option
      screen.getByRole("option", { name: "Tech" })
    );

    const selectMenu = screen.getByRole("option", {
      name: "Tech",
    }) as HTMLOptionElement;
    expect(selectMenu.selected).toBe(true);

    expect(
      (screen.queryByText("General") as HTMLOptionElement).selected
    ).toBeFalsy();
    expect(
      (screen.getByText("Tech") as HTMLOptionElement).selected
    ).toBeTruthy();
  });
});
