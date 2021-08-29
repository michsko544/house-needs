import styles from "./styles.module.scss";
import classnames from "classnames";
import { HouseNeed } from "models/HouseNeed";
import { ReactComponent as TrashIcon } from "assets/trash.svg";

type Props = {
  title: string;
  needs: HouseNeed[];
  active?: boolean;
  onNeedClick: (need: HouseNeed) => void;
  onTrashClick?: (id: string) => void;
};

export default function NeedsList(props: Props): JSX.Element {
  const {
    title = "Needs",
    needs = [],
    active = true,
    onNeedClick,
    onTrashClick = () => {},
  } = props;

  return (
    <div className={classnames(!active && styles.inactive)}>
      {needs.find((elem) => elem.active === active) && (
        <>
          <h2 className={styles.label}>{title}</h2>
          <ul className={styles.list}>
            {needs.map(
              (need) =>
                need.active === active && (
                  <li key={need.id}>
                    <span onClick={() => onNeedClick(need)}>{need.name}</span>
                    {need.active && (
                      <button onClick={() => onTrashClick(need.id)}>
                        <TrashIcon />
                      </button>
                    )}
                  </li>
                )
            )}
          </ul>
        </>
      )}
    </div>
  );
}
