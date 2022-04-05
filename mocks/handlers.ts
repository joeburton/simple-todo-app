import { graphql } from 'msw';

import { todos, listIds } from './data';

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
  graphql.mutation(`AddTodo`, (_req, res, ctx) => {
    return res(
      ctx.data({
        addTodo: {
          id: '623899eb1919a658e96f5d83',
          listId: 'tech',
          title: 'new todo',
          detail: 'just add a todo',
          complete: false,
          date: '1/1/2020',
        },
      })
    );
  }),
  graphql.query('GetTodos', (_req, res, ctx) => {
    return res(
      ctx.data({
        getTodos: todos,
      })
    );
  }),
  graphql.query('GetListIds', (_req, res, ctx) => {
    return res(
      ctx.data({
        getListIds: listIds,
      })
    );
  }),
];
