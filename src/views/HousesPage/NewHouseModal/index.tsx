import ContentWithLabel from "components/ContentWithLabel";
import * as Yup from "yup";
import Modal from "components/Modal";
import styles from "./styles.module.scss";
import { ReactComponent as XIcon } from "assets/x.svg";
import Button from "components/Button";
import { supabase } from "supabase";
import { useFormik } from "formik";
import InputText from "components/InputText";
import { setHouses } from "store/houses";
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { House } from "models/House";
import { setHouse } from "store/auth";
import { setHouseNeeds } from "store/houseNeeds";
import { setProfilesNeeds } from "store/profilesNeeds";

type Props = {
  handleClose: () => void;
  isVisible: boolean;
};

type NewHouse = {
  house: string;
};

const NewHouseValidationSchema = Yup.object().shape({
  house: Yup.string()
    .min(2, "House must have at least 2 characters")
    .required("House is required"),
});

export default function NewHouseModal(props: Props): JSX.Element {
  const { handleClose, isVisible } = props;

  const houses = useSelector((state: RootState) => state.houses.houses);
  const selectedHouse = useSelector((state: RootState) => state.auth.house);

  const dispatch = useDispatch();

  const user = supabase.auth.user();

  const initialValues: NewHouse = {
    house: "",
  };

  const handleSubmit = async (values: NewHouse): Promise<void> => {
    const { data, error } = await supabase
      .from("houses")
      .insert([{ name: values.house }])
      .single();

    if (!error && user) {
      let { error: setHouseError } = await supabase
        .from("profile_house")
        .insert([
          {
            profile_id: user.id,
            house_id: data.id,
          },
        ]);

      if (!setHouseError) {
        dispatch(setHouses([...houses, data as House]));

        if (user && (!selectedHouse || selectedHouse.id !== data.id)) {
          const { error } = await supabase
            .from("profiles")
            .update({ last_selected_house: data.id })
            .eq("id", user.id);
          if (!error) {
            dispatch(setHouse({ id: data.id, name: data.name }));
            dispatch(setHouseNeeds([]));
            dispatch(setProfilesNeeds([]));
          }
        }

        formik.resetForm();
        handleClose();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent): void => {
    formik.handleChange(e);
  };

  const formik = useFormik<NewHouse>({
    initialValues: initialValues,
    validationSchema: NewHouseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <Modal isVisible={isVisible} handleClose={handleClose}>
      <ContentWithLabel title="New house" noTopMargin={true}>
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
              label="House name"
              placeholder="Broadway Penthouse"
              onChange={handleChange}
              autoComplete="house"
              value={formik.values.house}
              disabled={formik.isSubmitting}
              error={(formik.touched.house && formik.errors.house) || ""}
            />

            <Button
              className={styles.alignBottom}
              type="submit"
              disabled={formik.isSubmitting}
            >
              Create house
            </Button>
          </form>
        </>
      </ContentWithLabel>
    </Modal>
  );
}
