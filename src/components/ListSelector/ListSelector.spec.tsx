import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import apolloClient from '../../apollo/apolloClient';

import { listIds } from '../../../mocks/data';

import ListSelector from './ListSelector';

describe('ListSelector', () => {
  it('should render the SelectMenu and all options', () => {
    const { getByTestId } = render(
      <ApolloProvider client={apolloClient}>
        <ListSelector setSelectedListId={(e) => {}} dataListIds={listIds} />
      </ApolloProvider>
    );
    expect(getByTestId('list-selector')).toBeDefined();
  });
});
