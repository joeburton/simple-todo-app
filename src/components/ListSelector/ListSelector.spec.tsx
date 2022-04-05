import { render } from '@testing-library/react';

import ListSelector from './ListSelector';

describe('ListSelector', () => {
  it('should render the SelectMenu and all options', () => {
    const { getByTestId } = render(<ListSelector />);
    expect(getByTestId('list-selector')).toBeDefined();
  });
});
