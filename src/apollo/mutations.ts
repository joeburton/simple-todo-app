import { gql } from '@apollo/client';

const ADD_TODO = gql`
  mutation AddTodo($title: String, $detail: String,  $complete: Boolean, $date: Date) {
    addTodo(title: $title, detail: $detail, $complete: Boolean,  date: $date) {
      title
      detail
      complete
      date
    }
  }
`;

export { ADD_TODO };
