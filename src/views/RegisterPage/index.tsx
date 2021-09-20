import ContentWithLabel from "components/ContentWithLabel";
import { ReactComponent as MailIcon } from "assets/mail.svg";
import RegisterForm from "./RegisterForm";
import * as qs from "query-string";
import { useLocation } from "react-router";
import { useState } from "react";

export default function RegisterPage(): JSX.Element {
  const location = useLocation();
  const params = qs.parse(location.search);
  const house = typeof params.house === "string" ? params.house : "";
  const [success, setSuccess] = useState(false);

  return (
    <div className="contentContainer">
      {success ? (
        <ContentWithLabel title="Registration success">
          <>
            <p>
              You have successfully registered. <b>Check your email</b> to
              activate account.
            </p>
            <br />
            <div style={{ display: "flex", alignItems: "center" }}>
              Email sent
              <MailIcon style={{ marginLeft: 8 }} />
            </div>
          </>
        </ContentWithLabel>
      ) : (
        <ContentWithLabel title="Register">
          <RegisterForm house={house} onSuccess={() => setSuccess(true)} />
        </ContentWithLabel>
      )}
    </div>
  );
}
