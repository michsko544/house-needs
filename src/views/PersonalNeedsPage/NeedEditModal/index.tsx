// import { useState } from "react";
import * as Yup from "yup";
import { supabase } from "supabase";

import Button from "components/Button";
import Modal from "components/Modal";
import ContentWithLabel from "components/ContentWithLabel";
import { UserNeed } from "models/UserNeed";

import { ReactComponent as XIcon } from "assets/x.svg";

import styles from "./styles.module.scss";
import { useFormik } from "formik";
import InputText from "components/InputText";

type Props = {
  handleClose: () => void;
  isVisible: boolean;
  need: UserNeed | null;
};

type EditNeed = {
  need: string;
  needUrl: string;
};

const EditNeedValidationSchema = Yup.object().shape({
  need: Yup.string()
    .min(2, "Need must have at least 2 characters")
    .required("Need is required"),
});

export default function NeedEditModal(props: Props): JSX.Element {
  const { handleClose, isVisible, need } = props;

  // const user = supabase.auth.user();

  const initialValues: EditNeed = {
    need: need?.need ?? "",
    needUrl: need?.needUrl ?? "",
  };

  const handleChange = (e: React.ChangeEvent): void => {
    formik.handleChange(e);
  };

  const handleCloseModal = () => {
    handleClose();
  };

  const handleSubmit = async (values: EditNeed): Promise<void> => {
    const { error } = await supabase
      .from("user-needs")
      .update({ need: values.need, need_url: values.needUrl })
      .eq("id", need?.id)
      .single();

    if (!error) {
      handleCloseModal();
    }
  };

  const formik = useFormik<EditNeed>({
    initialValues: initialValues,
    validationSchema: EditNeedValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <Modal isVisible={isVisible} handleClose={handleCloseModal}>
      <ContentWithLabel title="Edit need" noTopMargin={true}>
        <>
          <div className={styles.close} onClick={handleCloseModal}>
            <XIcon />
          </div>
          {need && (
            <form
              className={styles.modalContent}
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <InputText
                id="need"
                type="text"
                label="Need name"
                placeholder="Pillow in heart shape ❤"
                onChange={handleChange}
                autoComplete="off"
                value={formik.values.need}
                disabled={formik.isSubmitting}
                error={(formik.touched.need && formik.errors.need) || ""}
              />

              <InputText
                id="needUrl"
                type="text"
                label="Link to need"
                placeholder="https://pepper.pl/sale"
                onChange={handleChange}
                autoComplete="off"
                value={formik.values.needUrl}
                disabled={formik.isSubmitting}
                error={(formik.touched.needUrl && formik.errors.needUrl) || ""}
              />

              <div className={styles.alignBottom}>
                <Button type="submit" disabled={formik.isSubmitting}>
                  Update Need
                </Button>
              </div>
            </form>
          )}
        </>
      </ContentWithLabel>
    </Modal>
  );
}
