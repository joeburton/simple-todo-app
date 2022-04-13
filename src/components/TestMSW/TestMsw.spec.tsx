import { render } from '@testing-library/react';

import { setupServer } from 'msw/node';
import { graphql } from 'msw';

import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../apollo/apolloClient';
import TestMsw from './TestMsw';

const handlers = [
  graphql.query('GetTodos', (_req, res, ctx) => {
    return res(
      ctx.data({
        getTodos: [
          {
            id: '6228e38df41cdf8ac72bb1d0',
            listName: 'tech 1',
            title: 'My first todo',
            detail: 'So much detail',
            complete: false,
            date: '1/1/2020',
          },
          {
            id: '6228e38df41cdf8ac72bb1d0',
            listName: 'tech 2',
            title: 'My first todo',
            detail: 'So much detail',
            complete: false,
            date: '1/1/2020',
          },
        ],
      })
    );
  }),
];

const server = setupServer(...handlers);

describe('TestMsw', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it('graphql calls should be intercepted by msw', async () => {
    const { findByTestId, queryByTestId } = render(
      <ApolloProvider client={apolloClient}>
        <TestMsw />
      </ApolloProvider>
    );

    await findByTestId('intercept-graphql-calls');

    expect(queryByTestId('intercept-graphql-calls')).toBeDefined();
  });
});
