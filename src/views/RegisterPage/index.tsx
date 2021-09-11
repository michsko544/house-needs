import ContentWithLabel from "components/ContentWithLabel";
import RegisterForm from "./RegisterForm";
import * as qs from "query-string";
import { useLocation } from "react-router";

export default function RegisterPage(): JSX.Element {
  const location = useLocation();
  const params = qs.parse(location.search);
  const house = typeof params.house === "string" ? params.house : "";

  return (
    <div className="contentContainer">
      <ContentWithLabel title="Register">
        <RegisterForm house={house} />
      </ContentWithLabel>
    </div>
  );
}
