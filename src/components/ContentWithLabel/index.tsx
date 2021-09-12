import classnames from "classnames";
import { ReactChild } from "react";
import styles from "./styles.module.scss";

type Props = {
  title: string;
  children: ReactChild;
  textAlign?: "left" | "right";
};

export default function ContentWithLabel(props: Props): JSX.Element {
  const { title, children, textAlign = "left" } = props;

  return (
    <>
      <h2
        className={classnames(
          styles.label,
          textAlign !== "left" && styles.alignRight
        )}
      >
        {title}
      </h2>
      {children}
    </>
  );
}
