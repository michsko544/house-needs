import ContentWithLabel from "components/ContentWithLabel";
import LoginForm from "./LoginForm";

export default function LoginPage(): JSX.Element {
  return (
    <div className="contentContainer">
      <ContentWithLabel title="Login">
        <LoginForm />
      </ContentWithLabel>
    </div>
  );
}
