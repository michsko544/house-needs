import { HouseNeed } from "models/HouseNeed";
import { useState } from "react";
import NeedsList from "./NeedsList";

export default function HomePage(): JSX.Element {
  const NEEDS: HouseNeed[] = [
    { name: "Kanapa", active: true },
    { name: "Wąż z prysznica", active: true },
    { name: "TV", active: false },
    { name: "Papier toaletowy", active: false },
    { name: "Śmietana w spreju", active: true },
  ];

  const [needs, setNeeds] = useState(NEEDS);

  const handleNeedClick = (need: HouseNeed) => {
    setNeeds(
      needs.map((elem) => {
        return elem.name === need.name
          ? { ...elem, active: !elem.active }
          : elem;
      })
    );
  };

  return (
    <div>
      <NeedsList
        title="Top needs"
        needs={needs}
        onNeedClick={handleNeedClick}
      />
      <NeedsList
        title="Realized needs"
        needs={needs}
        active={false}
        onNeedClick={handleNeedClick}
      />
    </div>
  );
}
