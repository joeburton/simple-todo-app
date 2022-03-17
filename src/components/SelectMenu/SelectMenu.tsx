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
};

const SelectMenu = <T extends OptionValue>({
  options,
  onChange,
  customStyles,
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
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} role='option'>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectMenu;
