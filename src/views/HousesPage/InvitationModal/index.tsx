import ContentWithLabel from "components/ContentWithLabel";
import * as Yup from "yup";
import Modal from "components/Modal";
import styles from "./styles.module.scss";
import { ReactComponent as XIcon } from "assets/x.svg";
import Button from "components/Button";
import { useFormik } from "formik";
import InputText from "components/InputText";

type Props = {
  handleClose: () => void;
  isVisible: boolean;
};

type Invitation = {
  email: string;
  house: string;
  invitationText: string;
};

const InvitationValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  house: Yup.string()
    .min(2, "House must have at least 2 characters")
    .required("House is required"),
  invitationText: Yup.string()
    .min(2, "Invitation must have at least 2 characters")
    .required("Invitation is required"),
});

export default function InvitationModal(props: Props): JSX.Element {
  const { handleClose, isVisible } = props;

  const initialValues: Invitation = {
    email: "",
    house: "",
    invitationText: "",
  };

  const handleSubmit = async (_values: Invitation): Promise<void> => {};

  const handleChange = (e: React.ChangeEvent): void => {
    formik.handleChange(e);
  };

  const formik = useFormik<Invitation>({
    initialValues: initialValues,
    validationSchema: InvitationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <Modal isVisible={isVisible} handleClose={handleClose}>
      <ContentWithLabel title="Send invite" noTopMargin={true}>
        <>
          <div className={styles.close} onClick={handleClose}>
            <XIcon />
          </div>
          <form
            onSubmit={formik.handleSubmit}
            noValidate
            className={styles.formClass}
          >
            <InputText
              id="house"
              type="text"
              label="Existing house"
              placeholder="Broadway Penthouse"
              onChange={handleChange}
              autoComplete="off"
              value={formik.values.house}
              disabled={formik.isSubmitting}
              error={(formik.touched.house && formik.errors.house) || ""}
            />
            <InputText
              id="email"
              type="email"
              label="E-mail"
              placeholder="jam@jam.com"
              onChange={handleChange}
              autoComplete="off"
              value={formik.values.email}
              disabled={formik.isSubmitting}
              error={(formik.touched.email && formik.errors.email) || ""}
            />
            <InputText
              id="invitationText"
              type="text"
              label="Invitation"
              placeholder="Invitation text"
              onChange={handleChange}
              autoComplete="off"
              value={formik.values.invitationText}
              disabled={formik.isSubmitting}
              error={
                (formik.touched.invitationText &&
                  formik.errors.invitationText) ||
                ""
              }
            />
            <Button
              className={styles.alignBottom}
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Loading..." : "Send invitation"}
            </Button>
          </form>
        </>
      </ContentWithLabel>
    </Modal>
  );
}
