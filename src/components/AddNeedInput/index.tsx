import { ReactComponent as PlusIcon } from "assets/plus.svg";
import { ReactComponent as CheckIcon } from "assets/check.svg";
import { ReactComponent as XIcon } from "assets/x.svg";
import { useState } from "react";

import styles from "./styles.module.scss";
import classnames from "classnames";

type Props = {
  onCheckClick: (value: string) => void;
};

export default function AddNeedInput(props: Props): JSX.Element {
  const { onCheckClick } = props;

  const [text, setText] = useState("");
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = (isOpen: boolean) => {
    setOpen(!isOpen);
  };

  const handleCheckClick = (text: string) => {
    if (text !== "") {
      onCheckClick(text);
      setOpen(false);
    }
    setText("");
  };

  return (
    <div className={classnames(styles.addNeedContainer, isOpen && styles.open)}>
      <button
        onClick={() => toggleOpen(isOpen)}
        className={classnames(isOpen && styles.hide)}
      >
        <PlusIcon />
      </button>
      <div className={classnames(styles.inputWrapper, isOpen && styles.show)}>
        <input
          type="text"
          value={text}
          placeholder="Type here new need..."
          onChange={({ target }) => setText(target.value)}
        />
        <div className={styles.buttonsWrapper}>
          <button onClick={() => toggleOpen(isOpen)}>
            <XIcon />
          </button>
          <button onClick={() => handleCheckClick(text)}>
            <CheckIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
