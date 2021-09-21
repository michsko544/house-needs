import classnames from "classnames";
import { ReactChild } from "react";
import styles from "./styles.module.scss";

type Props = {
  title: string;
  children: ReactChild;
  textAlign?: "left" | "right";
  noTopMargin?: boolean;
};

export default function ContentWithLabel(props: Props): JSX.Element {
  const { title, children, textAlign = "left", noTopMargin = false } = props;

  return (
    <>
      <h2
        className={classnames(
          styles.label,
          textAlign !== "left" && styles.alignRight,
          noTopMargin && styles.noTopMargin
        )}
      >
        {title}
      </h2>
      {children}
    </>
  );
}
