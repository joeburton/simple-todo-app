import { gql } from '@apollo/client';

const ADD_TODO = gql`
  mutation AddTodo(
    $listName: String
    $title: String
    $detail: String
    $complete: Boolean
    $date: Date
  ) {
    addTodo(
      listName: $listName
      title: $title
      detail: $detail
      complete: $complete
      date: $date
    ) {
      id
      listName
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
    $listName: String
    $title: String
    $detail: String
    $complete: Boolean
    $date: Date
  ) {
    updateTodo(
      id: $id
      listName: $listName
      title: $title
      detail: $detail
      complete: $complete
      date: $date
    ) {
      id
      listName
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

const ADD_LIST_NAME = gql`
  mutation AddListName($listName: String) {
    addListName(listName: $listName) {
      listName
      id
    }
  }
`;

const DELETE_LIST_NAME = gql`
  mutation DeleteListName($id: ID) {
    deleteListName(id: $id)
  }
`;

export { ADD_TODO, UPDATE_TODO, DELETE_TODO, ADD_LIST_NAME, DELETE_LIST_NAME };
