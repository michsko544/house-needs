import ContentWithLabel from "components/ContentWithLabel";
import RegisterForm from "./RegisterForm";

type Props = {};

export default function RegisterPage({}: Props): JSX.Element {
  return (
    <div className="contentContainer">
      <ContentWithLabel title="Register">
        <RegisterForm />
      </ContentWithLabel>
    </div>
  );
}
