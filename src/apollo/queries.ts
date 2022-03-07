import { gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      title
      detail
      complete
      date
    }
  }
`;

const GET_TODO = gql`
  query GetTodo($id: String) {
    getTodo(id: $id) {
      id
      title
      detail
      complete
      date
    }
  }
`;

export { GET_TODO, GET_TODOS };
