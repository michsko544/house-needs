import classnames from "classnames";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

type Props = {
  title: string;
  children: ReactNode;
  textAlign?: "left" | "right";
  noTopMargin?: boolean;
  size?: 14 | 20;
};

export default function ContentWithLabel(props: Props): JSX.Element {
  const {
    title,
    children,
    textAlign = "left",
    noTopMargin = false,
    size = 20,
  } = props;

  return (
    <>
      <h2
        className={classnames(
          styles.label,
          textAlign !== "left" && styles.alignRight,
          noTopMargin && styles.noTopMargin,
          size === 14 && styles.size14,
          size === 20 && styles.size20
        )}
      >
        {title}
      </h2>
      {children}
    </>
  );
}
