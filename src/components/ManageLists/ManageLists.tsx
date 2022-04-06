import styles from './ManageLists.module.css';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import { ADD_LIST_NAME, DELETE_LIST_NAME } from '../../apollo/mutations';
import { useRef } from 'react';
import { useMutation } from '@apollo/client';

interface ListSelectorProps {
  dataListNames: Array<{ listName: string; id: string }>;
}

const ManageLists = ({ dataListNames }: ListSelectorProps) => {
  const newTodoListRef = useRef<HTMLInputElement>(null);
  const [addListName] = useMutation(ADD_LIST_NAME);
  const [deleteListName] = useMutation(DELETE_LIST_NAME);

  const removeListName = (id: string) => {
    deleteListName({
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
            addListName({
              variables: {
                listName: newTodoListRef?.current?.value,
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
        {dataListNames?.map((item: { listName: string; id: string }) => (
          <li key={item.listName} onClick={() => removeListName(item.id)}>
            <div className={styles.listName}>
              <ModeStandbyIcon sx={{ fontSize: '1.2rem' }} />
              <span>{item.listName}</span>
            </div>
            <DeleteOutlineIcon />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageLists;
