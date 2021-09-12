import styles from "./styles.module.scss";
import classnames from "classnames";
import { ReactComponent as TrashIcon } from "assets/trash.svg";
import ContentWithLabel from "components/ContentWithLabel";
import { Need } from "models/Need";

type Props = {
  title: string;
  needs: Need[];
  active?: boolean;
  onNeedClick: (need: Need) => void;
  onTrashClick?: (id: string) => void;
  labelAlign?: "left" | "right";
};

export default function NeedsList(props: Props): JSX.Element {
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
                    <TrashIcon />
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
