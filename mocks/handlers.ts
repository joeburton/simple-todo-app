import { graphql } from 'msw';

import data from './data';

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
  graphql.mutation(`DeleteTodo`, (_req, res, ctx) => {
    return res(
      ctx.data({
        deleteTodo: 'todo deleted',
      })
    );
  }),
  graphql.query('GetTodos', (_req, res, ctx) => {
    return res(
      ctx.data({
        getTodos: data,
      })
    );
  }),
];
