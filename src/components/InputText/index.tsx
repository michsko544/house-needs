import styles from "./styles.module.scss";

type Props = {
  id: string;
  label: string;
  type?: "text" | "password" | "email";
  error?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
  restProps?: unknown[];
};

export default function InputText(props: Props): JSX.Element {
  const {
    id,
    type = "text",
    error,
    value,
    label,
    placeholder = "",
    onChange,
    autoComplete,
    disabled = false,
    ...restProps
  } = props;

  return (
    <label htmlFor={id} className={styles.input}>
      {label}
      <input
        type={type}
        id={id}
        {...restProps}
        autoComplete={autoComplete}
        onChange={onChange}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
      />
      {error && <b>{error}</b>}
    </label>
  );
}
