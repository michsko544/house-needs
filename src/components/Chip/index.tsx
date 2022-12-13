import classnames from "classnames";

import styles from "./styles.module.scss";

interface Props<T> {
  label?: string;
  onClick?: (val: T) => void;
  active?: boolean;
  value: T;
  className?: string;
}

export default function Chip<T>({
  label = "",
  onClick = () => null,
  active = false,
  value,
  className = "",
}: Props<T>): JSX.Element {
  return (
    <div
      className={classnames(styles.chip, className, active && styles.active)}
      onClick={() => onClick(value)}
    >
      {label}
    </div>
  );
}
