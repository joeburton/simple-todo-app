import styles from './SelectMenu.module.css';

type OptionValue = string | number;

type OptionInterface<T extends OptionValue> = {
  value: T;
  label: string;
};

type SelectProps<T extends OptionValue> = {
  options: OptionInterface<T>[];
  onChange: (value: T) => void;
  customStyles?: React.CSSProperties;
  selectedOption?: string;
};

const SelectMenu = <T extends OptionValue>({
  options,
  onChange,
  customStyles,
  selectedOption,
}: SelectProps<T>) => {
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
      value={selectedOption}
      aria-label='Please select a list'
    >
      {options.map((option, index) => (
        <Option option={option} key={index} selectedOption={selectedOption} />
      ))}
    </select>
  );
};

const Option = ({ option, selectedOption }: any) => {
  return (
    <option
      value={option.value}
      aria-selected={selectedOption === option.value}
    >
      {option.label}
    </option>
  );
};

export default SelectMenu;
