import { graphql } from 'msw';

export const handlers = [
  graphql.mutation(`UpdateTodo`, (_req, res, ctx) => {
    return res(
      ctx.data({
        updateTodo: [
          {
            id: '6228e38df41cdf8ac72bb1d0',
            listId: 'tech',
            title: 'My first todo 1',
            detail: 'So much detail',
            complete: true,
            date: '1/1/2020',
          },
        ],
      })
    );
  }),
  graphql.query('GetTodos', (_req, res, ctx) => {
    return res(
      ctx.data({
        getTodos: [
          {
            id: '6228e38df41cdf8ac72bb1d0',
            listId: 'tech',
            title: 'My first todo 1',
            detail: 'So much detail',
            complete: false,
            date: '1/1/2020',
          },
          {
            id: '6228e38df41cdf8ac72bb1d0',
            listId: 'general',
            title: 'My first todo 2',
            detail: 'So much detail',
            complete: false,
            date: '1/1/2020',
          },
        ],
      })
    );
  }),
];
