import styles from './SelectMenu.module.css';

type OptionValue = string | number;

type Option<T extends OptionValue> = {
  value: T;
  label: string;
};

type Props<T extends OptionValue> = {
  options: Option<T>[];
  onChange: (value: T) => void;
  customStyles?: React.CSSProperties;
  selectedOption?: string;
};

const SelectMenu = <T extends OptionValue>({
  options,
  onChange,
  customStyles,
  selectedOption,
}: Props<T>) => {
  const handleOnChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.currentTarget;
    const selectedOption = options[selectedIndex];
    onChange(selectedOption.value);
  };
  return (
    <select
      onChange={handleOnChange}
      className={styles.selectMenu}
      style={customStyles}
      data-testid='select-menu'
      role='combobox'
      value={selectedOption}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectMenu;
