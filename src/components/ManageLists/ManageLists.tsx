import { useState } from 'react';

import { CustomButton } from '../';
import { DeleteIcon, TargetIcon } from '../CustomIcons';

import styles from './ManageLists.module.css';

import { useMutation } from '@apollo/client';
import { ADD_LIST_NAME, DELETE_LIST_NAME } from '../../apollo/mutations';
import { ACTIONS, updateListNamesCache } from '../../apollo/updateCache';

interface ListSelectorProps {
  dataListNames: { listName: string; id: string }[];
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
        <TargetIcon />
        <span>{listName}</span>
      </div>
      <DeleteIcon />
    </li>
  );
};

const ManageLists = ({ dataListNames }: ListSelectorProps) => {
  const [newListName, setNewListName] = useState('');

  const [addListName] = useMutation(ADD_LIST_NAME, {
    update: updateListNamesCache(ACTIONS.ADD_LIST, {
      listName: newListName,
    }),
  });

  return (
    <div data-testid="manage-lists">
      <div className={styles.addList}>
        <input
          className={styles.addListInput}
          value={newListName}
          aria-label="add new list"
          onChange={(e) => setNewListName(e.target.value)}
        />
        <CustomButton
          buttonText="ADD LIST"
          onClick={() => {
            addListName({
              variables: {
                listName: newListName,
              },
            });
          }}
        />
      </div>
      <h2>Remove List</h2>
      <ul data-testid="lists" className={styles.lists}>
        {dataListNames?.map((item: { listName: string; id: string }, index) => (
          <ListItem {...item} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default ManageLists;
