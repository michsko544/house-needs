import { ReactChild } from "react";
import styles from "./styles.module.scss";

type Props = {
  title: string;
  children: ReactChild;
};

export default function ContentWithLabel(props: Props): JSX.Element {
  const { title, children } = props;

  return (
    <>
      <h2 className={styles.label}>{title}</h2>
      {children}
    </>
  );
}
