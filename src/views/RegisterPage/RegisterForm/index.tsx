import * as Yup from "yup";
import { useFormik } from "formik";
import InputText from "components/InputText";

import styles from "./styles.module.scss";
import Button from "components/Button";
import { supabase } from "supabase";
import { Link } from "react-router-dom";

type Props = {
  house: string;
  onSuccess: () => void;
};
interface Register {
  email: string;
  firstName: string;
  house: string;
  password: string;
  secondPassword: string;
}

const RegisterValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string()
    .min(2, "First name must have at least 2 characters")
    .required("First name is required"),
  house: Yup.string()
    .min(2, "House must have at least 2 characters")
    .required("House is required"),
  password: Yup.string().required("Password is required"),
  secondPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Second password is required"),
});

export default function RegisterForm({ house, onSuccess }: Props): JSX.Element {
  const initialValues: Register = {
    email: "",
    firstName: "",
    house,
    password: "",
    secondPassword: "",
  };

  const handleSubmit = async (values: Register): Promise<void> => {
    let { data: house, error: houseError } = await supabase
      .from("houses")
      .select("id")
      .ilike("name", values.house)
      .single();

    let signUpError = null,
      user = null,
      profileError = null,
      setHouseError = null;
    if (!houseError) {
      ({ user, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      }));
    } else {
      formik.setStatus({ error: "No single house founded." });
    }

    if (!signUpError && user) {
      ({ error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          last_selected_house: house.id,
          first_name: values.firstName,
        },
      ]));
    }

    if (user && !houseError && !signUpError) {
      ({ error: setHouseError } = await supabase.from("profile_house").insert([
        {
          profile_id: user.id,
          house_id: house.id,
        },
      ]));
    }

    if (profileError) {
      formik.setStatus({ error: "Error while saving profile." });
    }

    if (setHouseError) {
      formik.setStatus({ error: "Error while connecting user with house." });
    }

    if (signUpError) {
      formik.setStatus({ error: "Something went wrong." });
    }

    const error = houseError || signUpError || profileError || setHouseError;

    if (!error) {
      formik.resetForm();
      onSuccess();
    }
  };

  const handleChange = (e: React.ChangeEvent): void => {
    formik.handleChange(e);
  };

  const formik = useFormik<Register>({
    initialValues: initialValues,
    validationSchema: RegisterValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate>
        <InputText
          id="email"
          type="email"
          label="E-mail"
          placeholder="jam@jam.com"
          onChange={handleChange}
          autoComplete="email"
          value={formik.values.email}
          disabled={formik.isSubmitting}
          error={(formik.touched.email && formik.errors.email) || ""}
        />
        <InputText
          id="firstName"
          type="text"
          label="First name"
          placeholder="Joe"
          onChange={handleChange}
          autoComplete="given-name"
          value={formik.values.firstName}
          disabled={formik.isSubmitting}
          error={(formik.touched.firstName && formik.errors.firstName) || ""}
        />
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
          id="password"
          type="password"
          label="Password"
          placeholder="*************"
          onChange={handleChange}
          autoComplete="new-password"
          value={formik.values.password}
          disabled={formik.isSubmitting}
          error={(formik.touched.password && formik.errors.password) || ""}
        />
        <InputText
          id="secondPassword"
          type="password"
          label="Repeat password"
          placeholder="*************"
          onChange={handleChange}
          autoComplete="new-password"
          value={formik.values.secondPassword}
          disabled={formik.isSubmitting}
          error={
            (formik.touched.secondPassword && formik.errors.secondPassword) ||
            ""
          }
        />
        {formik.status?.error && (
          <b style={{ marginTop: 4, display: "block" }}>
            {formik.status.error.toString()}
          </b>
        )}
        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Loading..." : "Sign up"}
        </Button>
      </form>
      <Link to="/login" className={styles.loginLink}>
        To login, click here
      </Link>
    </>
  );
}
