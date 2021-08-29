import ContentWithLabel from "components/ContentWithLabel";
import RegisterForm from "./RegisterForm";

export default function RegisterPage(): JSX.Element {
  return (
    <div className="contentContainer">
      <ContentWithLabel title="Register">
        <RegisterForm />
      </ContentWithLabel>
    </div>
  );
}
