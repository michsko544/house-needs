import { ReactElement } from "react";
import { Route, RouteProps } from "react-router-dom";

const PublicRoute = ({ children, ...rest }: RouteProps): ReactElement => {
  return <Route {...rest}>{children}</Route>;
};

export default PublicRoute;
