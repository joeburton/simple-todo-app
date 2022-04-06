import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectMenu from './SelectMenu';

const renderSelectMenu = () => {
  return {
    ...render(
      <SelectMenu
        options={[
          { value: 'default', label: 'Select List' },
          { value: 'general', label: 'General' },
          { value: 'tech', label: 'Tech' },
        ]}
        onChange={(value) => {}}
        customStyles={{ minWidth: '200px', height: '38px' }}
      />
    ),
  };
};

describe('SelectMenu', () => {
  it('should render the SelectMenu and all options', () => {
    const { getByTestId, getAllByRole } = renderSelectMenu();
    expect(getByTestId('select-menu')).toBeDefined();
    expect(getAllByRole('option').length).toEqual(3);
  });

  it('should have the default value selected', () => {
    const { getByText } = renderSelectMenu();

    expect(
      (getByText('Select List') as HTMLOptionElement).selected
    ).toBeTruthy();
    expect((getByText('Select List') as HTMLOptionElement).value).toEqual(
      'default'
    );
  });

  it('should allow user to select a different option', () => {
    const { getByText, getByRole } = renderSelectMenu();
    userEvent.selectOptions(
      // Find the select element
      getByRole('combobox'),
      // Find and select the General option
      getByRole('option', { name: 'General' })
    );

    const selectMenu = getByRole('option', {
      name: 'General',
    }) as HTMLOptionElement;

    expect(selectMenu.selected).toBe(true);
    expect((getByText('General') as HTMLOptionElement).selected).toBeTruthy();
    expect((getByText('Tech') as HTMLOptionElement).selected).toBeFalsy();
  });

  it('should allow user to select a different option', () => {
    const { getByText, getByRole } = renderSelectMenu();
    userEvent.selectOptions(
      // Find the select element
      getByRole('combobox'),
      // Find and select the Tech option
      getByRole('option', { name: 'Tech' })
    );

    const selectMenu = getByRole('option', {
      name: 'Tech',
    }) as HTMLOptionElement;
    expect(selectMenu.selected).toBe(true);

    expect((getByText('General') as HTMLOptionElement).selected).toBeFalsy();
    expect((getByText('Tech') as HTMLOptionElement).selected).toBeTruthy();
  });
});
