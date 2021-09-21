import ContentWithLabel from "components/ContentWithLabel";
import Modal from "components/Modal";
import styles from "./styles.module.scss";
import { ReactComponent as XIcon } from "assets/x.svg";
import Button from "components/Button";

type Props = {
  handleClose: () => void;
  isVisible: boolean;
};

export default function NewHouseModal(props: Props): JSX.Element {
  const { handleClose, isVisible } = props;

  return (
    <Modal isVisible={isVisible} handleClose={handleClose}>
      <ContentWithLabel title="New house" noTopMargin={true}>
        <>
          <div className={styles.close} onClick={handleClose}>
            <XIcon />
          </div>
          Work in progress
          <Button className={styles.alignBottom}>Create house</Button>
        </>
      </ContentWithLabel>
    </Modal>
  );
}
