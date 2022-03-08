import { gql } from '@apollo/client';

const ADD_TODO = gql`
  mutation AddTodo(
    $title: String
    $detail: String
    $complete: Boolean
    $date: Date
  ) {
    addTodo(title: $title, detail: $detail, complete: $complete, date: $date) {
      title
      detail
      complete
      date
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: ID
    $title: String
    $detail: String
    $complete: Boolean
    $date: Date
  ) {
    updateTodo(
      id: $id
      title: $title
      detail: $detail
      complete: $complete
      date: $date
    ) {
      id
      title
      detail
      complete
      date
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID) {
    deleteTodo(id: $id)
  }
`;

export { ADD_TODO, UPDATE_TODO, DELETE_TODO };
