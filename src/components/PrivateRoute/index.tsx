import { ReactElement } from "react";
import { useSelector } from "react-redux";

import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootState } from "store";

const PrivateRoute = ({ children, ...rest }: RouteProps): ReactElement => {
  const isLoggedin = useSelector((state: RootState) => state.auth.isLoggedin);
  return (
    <Route {...rest}>{isLoggedin ? children : <Redirect to="/login" />}</Route>
  );
};

export default PrivateRoute;
