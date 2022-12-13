import styles from "./styles.module.scss";
import classnames from "classnames";
import { ReactComponent as XIcon } from "assets/x.svg";
import ContentWithLabel from "components/ContentWithLabel";
import { Need } from "models/Need";

type Props<TNeed> = {
  title: string;
  needs: TNeed[];
  active?: boolean;
  onNeedClick: (need: TNeed) => void;
  onTrashClick?: (id: string) => void;
  labelAlign?: "left" | "right";
};

export default function NeedsList<TNeed extends Need>(
  props: Props<TNeed>
): JSX.Element {
  const {
    title = "Needs",
    needs = [],
    active = true,
    onNeedClick,
    onTrashClick = () => {},
    labelAlign = "left",
  } = props;

  return (
    <div className={classnames(!active && styles.inactive)}>
      <ContentWithLabel title={title} textAlign={labelAlign}>
        <ul className={styles.list}>
          {needs.map((need) => (
            <li key={need.id}>
              <div className={styles.normalElement}>
                <span onClick={() => onNeedClick(need)}>{need.need}</span>
                {active && (
                  <button onClick={() => onTrashClick(need.id)}>
                    <XIcon />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </ContentWithLabel>
    </div>
  );
}
