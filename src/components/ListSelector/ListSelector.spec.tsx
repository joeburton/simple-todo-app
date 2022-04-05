import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import apolloClient from '../../apollo/apolloClient';

import ListSelector from './ListSelector';

const listIds = [
  { listId: 'health' },
  { listId: 'challenge' },
  { listId: 'stepup' },
];

describe('ListSelector', () => {
  it('should render the SelectMenu and all options', () => {
    const { getByTestId } = render(
      <ApolloProvider client={apolloClient}>
        <ListSelector
          setSelectedListId={(e) => {
            console.log(e);
          }}
          dataListIds={listIds}
        />
      </ApolloProvider>
    );
    expect(getByTestId('list-selector')).toBeDefined();
  });
});
