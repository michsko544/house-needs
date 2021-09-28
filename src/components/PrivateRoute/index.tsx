import { ReactElement } from "react";
import { useSelector } from "react-redux";

import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootState } from "store";
import { supabase } from "supabase";

const PrivateRoute = ({ children, ...rest }: RouteProps): ReactElement => {
  const isLoggedinState = useSelector(
    (state: RootState) => state.auth.isLoggedin
  );
  const user = supabase.auth.user();

  const isLoggedin = isLoggedinState || (user && user.role === "authenticated");
  return (
    <Route {...rest}>{isLoggedin ? children : <Redirect to="/login" />}</Route>
  );
};

export default PrivateRoute;
