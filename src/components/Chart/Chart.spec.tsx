import { getAllByRole, render, waitFor } from '@testing-library/react';

import Chart from './Chart';

describe('Chart', () => {
  it('should render the Chart component', () => {
    const { getByTestId } = render(<Chart />);
    expect(getByTestId('my-chart')).toBeDefined();
  });

  it('should have the correct colour slice', async () => {
    const { getByTestId } = render(<Chart />);
    expect(getByTestId('my-chart')).toBeDefined();

    await waitFor(() =>
      expect(document.querySelectorAll('path').length).toEqual(4)
    );

    const slices = document.querySelectorAll('path');

    expect(slices[0]).toHaveAttribute('fill', '#0088FE');
  });
});
