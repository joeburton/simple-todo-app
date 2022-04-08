import { useRef } from 'react';

import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';

import styles from './ManageLists.module.css';

import { ADD_LIST_NAME, DELETE_LIST_NAME } from '../../apollo/mutations';
import { useMutation } from '@apollo/client';
import { ACTIONS, updateListNamesCache } from '../../apollo/updateCache';

interface ListSelectorProps {
  dataListNames: Array<{ listName: string; id: string }>;
}

const ListItem = ({ listName, id }: { listName: string; id: string }) => {
  const [deleteListName] = useMutation(DELETE_LIST_NAME, {
    update: updateListNamesCache(ACTIONS.DELETE_LIST, { id: id }),
  });

  const removeListName = () => {
    deleteListName({
      variables: { id: id },
    });
  };

  return (
    <li onClick={removeListName}>
      <div className={styles.listName}>
        <ModeStandbyIcon sx={{ fontSize: '1.2rem' }} />
        <span>{listName}</span>
      </div>
      <DeleteOutlineIcon />
    </li>
  );
};

const ManageLists = ({ dataListNames }: ListSelectorProps) => {
  const newTodoListRef = useRef<HTMLInputElement>(null);

  const [addListName] = useMutation(ADD_LIST_NAME, {
    update: updateListNamesCache(ACTIONS.ADD_LIST, {
      listName: newTodoListRef?.current?.value,
    }),
  });

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
        {dataListNames?.map((item: { listName: string; id: string }, index) => (
          <ListItem {...item} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default ManageLists;
