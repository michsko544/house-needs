import * as Yup from "yup";
import { useFormik } from "formik";
import InputText from "components/InputText";

import styles from "./styles.module.scss";
import Button from "components/Button";
import { supabase } from "supabase";
import { Link } from "react-router-dom";

interface Register {
  email: string;
  password: string;
  secondPassword: string;
}

const RegisterValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  secondPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Second password is required"),
});

export default function LoginForm(): JSX.Element {
  const initialValues: Register = {
    email: "",
    password: "",
    secondPassword: "",
  };

  const handleSubmit = async (values: Register): Promise<void> => {
    let { user, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    console.log(user);
    if (!error) formik.resetForm();
  };

  const handleChange = (e: React.ChangeEvent): void => {
    formik.handleChange(e);
  };

  const formik = useFormik<Register>({
    initialValues: initialValues,
    validationSchema: RegisterValidationSchema,
    onSubmit: handleSubmit,
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
          disabled={formik.isSubmitting}
          error={(formik.touched.email && formik.errors.email) || ""}
        />
        <InputText
          id="password"
          type="password"
          label="Password"
          placeholder="*************"
          onChange={handleChange}
          autoComplete="new-password"
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
          disabled={formik.isSubmitting}
          error={
            (formik.touched.secondPassword && formik.errors.secondPassword) ||
            ""
          }
        />
        <Button type="submit" disabled={formik.isSubmitting}>
          Sign up
        </Button>
      </form>
      <Link to="/login" className={styles.loginLink}>
        To login, click here
      </Link>
    </>
  );
}
