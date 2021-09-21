import { useRef } from "react";
import useOutsideClick from "hooks/useOutsideClick";

import styles from "./styles.module.scss";
import Portal from "components/Portal";

type Props = {
  children: React.ReactChild;
  isVisible: boolean;
  handleClose: () => void;
};

export default function Modal(props: Props) {
  const { children, isVisible, handleClose, ...restProps } = props;
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useOutsideClick(contentRef, handleClose, containerRef);

  return (
    <Portal isOpen={isVisible}>
      <div ref={containerRef} className={styles.popoverContainer}>
        <section ref={contentRef} className={styles.popoverWrapper}>
          <div className={styles.popoverMask} {...restProps}>
            {children}
          </div>
        </section>
      </div>
    </Portal>
  );
}
