import { ReactElement } from "react";
import ReactDOM from "react-dom";

import styles from "./styles.module.scss";

type Props = {
  isOpen: boolean;
  children: JSX.Element;
};

export default function Portal(props: Props): ReactElement {
  const PortalToBody = document.getElementById("body-portal") as HTMLElement;

  return ReactDOM.createPortal(
    <>
      {props.isOpen ? (
        <section className={styles.portalToBodyWrapper}>
          {props.children}
        </section>
      ) : null}
    </>,
    PortalToBody
  );
}
