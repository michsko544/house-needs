import styles from "./styles.module.scss";
import classnames from "classnames";
import { HouseNeed } from "models/HouseNeed";

type Props = {
  title: string;
  needs: HouseNeed[];
  active?: boolean;
  onNeedClick: (need: HouseNeed) => void;
};

export default function NeedsList(props: Props): JSX.Element {
  const { title = "Needs", needs = [], active = true, onNeedClick } = props;

  return (
    <div className={classnames("contentContainer", !active && styles.inactive)}>
      {needs.find((elem) => elem.active === active) && (
        <>
          <h2 className={styles.label}>{title}</h2>
          <ul className={styles.list}>
            {needs.map(
              (need) =>
                need.active === active && (
                  <li onClick={() => onNeedClick(need)} key={need.name}>
                    {need.name}
                  </li>
                )
            )}
          </ul>
        </>
      )}
    </div>
  );
}
