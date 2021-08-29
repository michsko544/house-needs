import * as Yup from "yup";
import { useFormik } from "formik";
import InputText from "components/InputText";

import styles from "./styles.module.scss";
import Button from "components/Button";
import { supabase } from "supabase";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "store/auth";

interface LogIn {
  email: string;
  password: string;
}

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues: LogIn = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LogIn): Promise<void> => {
    let { user, error } = await supabase.auth.signIn(values);
    console.log(user);
    if (!error && user) {
      formik.resetForm();
      dispatch(login(user));
      history.replace("/");
    }
  };

  const handleChange = (e: React.ChangeEvent): void => {
    formik.handleChange(e);
  };

  const formik = useFormik<LogIn>({
    initialValues: initialValues,
    validationSchema: LoginValidationSchema,
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
          autoComplete="current-password"
          disabled={formik.isSubmitting}
          error={(formik.touched.password && formik.errors.password) || ""}
        />
        <Button type="submit" disabled={formik.isSubmitting}>
          Sign in
        </Button>
      </form>
      <Link to="/register" className={styles.registerLink}>
        To register, click here
      </Link>
    </>
  );
}