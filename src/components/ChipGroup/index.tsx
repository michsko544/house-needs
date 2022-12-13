import classnames from "classnames";
import { ReactNode } from "react";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
}

export default function ChipGroup({
  className = "",
  children,
}: Props): JSX.Element {
  return (
    <fieldset className={classnames(styles.chipWrapper, className)}>
      {children}
    </fieldset>
  );
}
