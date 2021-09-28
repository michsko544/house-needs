import { SelectOption } from "models/SelectOption";
import ReactSelect, { GroupBase, StylesConfig } from "react-select";
import styles from "./styles.module.scss";

type Props = {
  options: SelectOption[];
  id: string;
  label: string;
  className?: string;
  onChange: (option: SelectOption | null) => void;
};

const customStyles: StylesConfig<
  SelectOption,
  boolean,
  GroupBase<SelectOption>
> = {
  container: (provided) => ({
    ...provided,
    color: "black",
    border: "none",
    marginTop: 4,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    border: "none",
    borderRadius: 0,
    outline: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    border: "none",
    padding: "11px 16px",
    background: state.isSelected ? "#ececec" : "#ffffff",
    color: "000000",
  }),
  control: (provided) => ({
    ...provided,
    padding: "11px 16px",
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: "#ececec",
    outline: "none",
    paddingRight: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    padding: "0",
    margin: "0",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    color: "#000000",
    paddingRight: 8,
    border: "none",
  }),
};

export default function Select(props: Props): JSX.Element {
  const { options, id, label, className, onChange } = props;

  return (
    <label htmlFor={id} className={styles.input}>
      {label}
      <ReactSelect
        options={options}
        className={className}
        //@ts-ignore
        onChange={onChange}
        styles={customStyles}
        theme={(theme) => ({ ...theme, primary: "#ececec" })}
      />
    </label>
  );
}
