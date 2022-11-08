import ContentWithLabel from "components/ContentWithLabel";
import * as Yup from "yup";
import Modal from "components/Modal";
import styles from "./styles.module.scss";
import { ReactComponent as XIcon } from "assets/x.svg";
import Button from "components/Button";
import { useFormik } from "formik";
import { useState } from "react";
import { supabase } from "supabase";
import Select from "components/Select";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { SelectOption } from "models/SelectOption";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = {
  handleClose: () => void;
  isVisible: boolean;
};

type Invitation = {
  house: string;
};

const InvitationValidationSchema = Yup.object().shape({
  house: Yup.string()
    .min(2, "House must have at least 2 characters")
    .required("House is required"),
});

export default function InvitationModal(props: Props): JSX.Element {
  const { handleClose, isVisible } = props;

  const [inviteLink, setInviteLink] = useState("");

  const houses = useSelector((state: RootState) => state.houses.houses);

  const initialValues: Invitation = {
    house: "",
  };

  const handleSubmit = async (values: Invitation): Promise<void> => {
    const { data, error } = await supabase
      .from("invitations")
      .insert([{ house_id: values.house }])
      .single();

    if (!error) {
      setInviteLink(
        `${window.location.origin}/join/${data.id}?house=${encodeURIComponent(
          houses.find((house) => house.id === formik.values["house"])?.name ||
            ""
        )}`
      );
    }
  };

  const handleSelectChange = (selectedOption: SelectOption | null): void => {
    formik.setFieldValue("house", selectedOption?.value);
  };

  const formik = useFormik<Invitation>({
    initialValues: initialValues,
    validationSchema: InvitationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const handleCloseInviteModal = () => {
    setInviteLink("");
    handleClose();
  };

  return (
    <Modal isVisible={isVisible} handleClose={handleCloseInviteModal}>
      <ContentWithLabel title="Create invite" noTopMargin={true}>
        <>
          <div className={styles.close} onClick={handleCloseInviteModal}>
            <XIcon />
          </div>
          {inviteLink === "" ? (
            <form
              onSubmit={formik.handleSubmit}
              noValidate
              className={styles.formClass}
            >
              <Select
                label={"Existing house"}
                id="house"
                options={houses.map((house) => ({
                  label: house.name,
                  value: house.id,
                }))}
                onChange={handleSelectChange}
              />

              <Button
                className={styles.alignBottom}
                type="submit"
                disabled={formik.isSubmitting || formik.values["house"] === ""}
              >
                {formik.isSubmitting ? "Loading..." : "Generate link"}
              </Button>
            </form>
          ) : (
            <div className={styles.successLink}>
              <p>
                You have successfully create invitation link! Copy link and send
                your friends.
              </p>
              <b>{inviteLink}</b>
              <CopyToClipboard text={inviteLink}>
                <Button className={styles.alignBottom} type="button">
                  Copy link
                </Button>
              </CopyToClipboard>
            </div>
          )}
        </>
      </ContentWithLabel>
    </Modal>
  );
}
