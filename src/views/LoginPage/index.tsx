import ContentWithLabel from "components/ContentWithLabel";
import LoginForm from "./LoginForm";

type Props = {};

export default function LoginPage({}: Props): JSX.Element {
  return (
    <div className="contentContainer">
      <ContentWithLabel title="Login">
        <LoginForm />
      </ContentWithLabel>
    </div>
  );
}
