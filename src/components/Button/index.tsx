import classnames from "classnames";
import React from "react";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  onClick?: () => void;
  children: JSX.Element | string | React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: JSX.Element;
};

export default function Button(props: Props): JSX.Element {
  const {
    className,
    onClick,
    children,
    type = "button",
    disabled,
    icon,
  } = props;
  return (
    <button
      className={classnames(className, styles.button)}
      onClick={onClick}
      type={type ? type : "button"}
      disabled={disabled}
    >
      {children}
      {icon ? <span className={styles.icon}>{icon}</span> : <></>}
    </button>
  );
}
