import { gql } from '@apollo/client';

const ADD_TODO = gql`
  mutation AddTodo(
    $listId: String
    $title: String
    $detail: String
    $complete: Boolean
    $date: Date
  ) {
    addTodo(
      listId: $listId
      title: $title
      detail: $detail
      complete: $complete
      date: $date
    ) {
      id
      listId
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
    $listId: String
    $title: String
    $detail: String
    $complete: Boolean
    $date: Date
  ) {
    updateTodo(
      id: $id
      listId: $listId
      title: $title
      detail: $detail
      complete: $complete
      date: $date
    ) {
      id
      listId
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
