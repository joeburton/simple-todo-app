import { gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      listName
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
      listName
      title
      detail
      complete
      date
    }
  }
`;

const GET_LIST_NAMES = gql`
  query GetListNames {
    getListNames {
      listName
      id
    }
  }
`;

export { GET_TODO, GET_TODOS, GET_LIST_NAMES };
