import { gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      listId
      title
      detail
      complete
      date
    }
  }
`;

const GET_TODO = gql`
  query GetTodo($id: ID) {
    getTodo(id: $id) {
      id
      listId
      title
      detail
      complete
      date
    }
  }
`;

const GET_LIST_IDS = gql`
  query GetListIds {
    getListIds {
      listId
      id
    }
  }
`;

export { GET_TODO, GET_TODOS, GET_LIST_IDS };
