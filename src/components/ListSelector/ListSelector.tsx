import { useEffect, useState } from 'react';
import { SelectMenu } from '../SelectMenu';
import styles from './ListSelector.module.css';

interface ListSelectorProps {
  setSelectedListId: (value: string) => void;
  dataListIds: Array<{ listId: string }>;
}

const ListSelector = ({
  setSelectedListId,
  dataListIds,
}: ListSelectorProps) => {
  const [optonData, setOptionData] = useState<Array<{
    value: string;
    label: string;
  }> | null>();

  useEffect(() => {
    const optionValues = dataListIds.map((item: { listId: string }) => {
      return { value: item.listId.toLowerCase(), label: item.listId };
    });

    setOptionData(optionValues);
  }, [dataListIds]);

  return (
    <div className={styles.selectList} data-testid='list-selector'>
      {optonData && (
        <SelectMenu
          options={optonData}
          onChange={(value) => {
            setSelectedListId(value);
          }}
          customStyles={{ minWidth: '200px', height: '38px' }}
        />
      )}
    </div>
  );
};

export default ListSelector;
