import styles from './ManageLists.module.css';
import Button from '@mui/material/Button';
import { ADD_LIST_ID } from '../../apollo/mutations';
import { useRef } from 'react';
import { useMutation } from '@apollo/client';

const ManageLists = () => {
  const newTodoListRef = useRef<HTMLInputElement>(null);
  const [addListId] = useMutation(ADD_LIST_ID);

  return (
    <div data-testid='manage-lists'>
      <div className={styles.addList}>
        <input className={styles.addListInput} ref={newTodoListRef} />
        <Button
          className={styles.add}
          onClick={() => {
            addListId({
              variables: {
                listId: newTodoListRef?.current?.value,
              },
            });
          }}
          variant='outlined'
          sx={{ marginLeft: '4px', padding: '6px', color: 'black' }}
        >
          ADD LIST
        </Button>
      </div>
    </div>
  );
};

export default ManageLists;
