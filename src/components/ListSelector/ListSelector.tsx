import { useEffect, useState } from 'react';
import { SelectMenu } from '../SelectMenu';
import styles from './ListSelector.module.css';

interface ListSelectorProps {
  setSelectedListName: (value: string) => void;
  dataListNames: Array<{ listName: string; id: string }>;
  selectedOption: string;
}

const ListSelector = ({
  setSelectedListName,
  dataListNames,
  selectedOption,
}: ListSelectorProps) => {
  const [optonData, setOptionData] = useState<Array<{
    value: string;
    label: string;
  }> | null>();

  useEffect(() => {
    const optionValues = dataListNames.map(
      (item: { listName: string; id: string }) => {
        return { value: item.listName.toLowerCase(), label: item.listName };
      }
    );

    optionValues.unshift(
      { value: 'default-view', label: 'Please Select' },
      { value: 'manage-lists', label: 'Manage Lists' },
      { value: 'view-all', label: 'View All Todos' },
      { value: '#', label: '----Lists----' }
    );

    setOptionData(optionValues);
  }, [dataListNames]);

  return (
    <div className={styles.selectList} data-testid='list-selector'>
      {optonData && (
        <SelectMenu
          options={optonData}
          onChange={(value) => {
            if (value === '#') {
              return;
            }
            setSelectedListName(value);
          }}
          selectedOption={selectedOption}
          customStyles={{ minWidth: '200px', height: '38px' }}
        />
      )}
    </div>
  );
};

export default ListSelector;
