import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import apolloClient from '../../apollo/apolloClient';

import ManageLists from './ManageLists';
import { listNames } from '../../../mocks/data';

describe('ManageLists', () => {
  it('should render the ManageLists component', () => {
    const { getByTestId } = render(
      <ApolloProvider client={apolloClient}>
        <ManageLists dataListNames={listNames} />
      </ApolloProvider>
    );
    expect(getByTestId('manage-lists')).toBeDefined();
  });
});
