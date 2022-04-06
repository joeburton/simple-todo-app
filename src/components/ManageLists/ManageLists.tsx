import styles from './ManageLists.module.css';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import { ADD_LIST_ID, DELETE_LIST_ID } from '../../apollo/mutations';
import { useRef } from 'react';
import { useMutation } from '@apollo/client';

interface ListSelectorProps {
  dataListIds: Array<{ listId: string; id: string }>;
}

const ManageLists = ({ dataListIds }: ListSelectorProps) => {
  const newTodoListRef = useRef<HTMLInputElement>(null);
  const [addListId] = useMutation(ADD_LIST_ID);
  const [deleteListId] = useMutation(DELETE_LIST_ID);

  const removeList = (id: string) => {
    deleteListId({
      variables: { id: id },
    });
  };

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
      <h2>Remove List</h2>
      <ul data-testid='lists' className={styles.lists}>
        {dataListIds?.map((item: { listId: string; id: string }) => (
          <li key={item.listId} onClick={() => removeList(item.id)}>
            <div className={styles.listName}>
              <ModeStandbyIcon sx={{ fontSize: '1.2rem' }} />
              <span>{item.listId}</span>
            </div>
            <DeleteOutlineIcon />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageLists;
