import styles from "./styles.module.scss";
import ContentWithLabel from "components/ContentWithLabel";
import { ReactComponent as CheckCircleIcon } from "assets/check-circle.svg";
import { House } from "models/House";
import { useSelector } from "react-redux";
import { RootState } from "store";

type Props = {
  title: string;
  houses: House[];
  onHouseClick: (house: House) => void;
  labelAlign?: "left" | "right";
};

export default function HousesList(props: Props): JSX.Element {
  const {
    title = "Needs",
    houses = [],
    onHouseClick,
    labelAlign = "left",
  } = props;

  const selectedHouse = useSelector((state: RootState) => state.auth.house);

  return (
    <ContentWithLabel title={title} textAlign={labelAlign}>
      <ul className={styles.list}>
        {houses.map((house) => (
          <li key={house.id}>
            <div className={styles.normalElement}>
              <span onClick={() => onHouseClick(house)}>{house.name}</span>
              {house.id === selectedHouse?.id && <CheckCircleIcon />}
            </div>
          </li>
        ))}
      </ul>
    </ContentWithLabel>
  );
}
